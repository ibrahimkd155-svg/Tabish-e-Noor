(() => {
  const $ = id => document.getElementById(id);
  const url = window.TABISH_SUPABASE_URL;
  const key = window.TABISH_SUPABASE_ANON_KEY;
  const ready = url && key && !url.includes('PASTE_') && !key.includes('PASTE_');
  if (!ready) {
    $('login-status').textContent = 'تنظیمات اتصال Supabase در دسترس نیست. فایل supabase-config.js را بررسی کنید.';
    $('password-login').disabled = true;
    return;
  }

  const db = window.supabase.createClient(url, key);
  const status = message => { $('dashboard-status').textContent = message; };
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
  let currentUser = null;
  let branch = null;

  async function verifyAdmin(user) {
    // Authorization is checked by the database function against admin_allowlist.
    const { data, error } = await db.rpc('is_school_admin');
    if (error) throw error;
    if (data !== true) throw new Error('این ایمیل در فهرست مدیران مجاز نیست.');
    return user;
  }

  async function start() {
    const { data: { session } } = await db.auth.getSession();
    if (!session) return;
    try {
      currentUser = await verifyAdmin(session.user);
      $('login-panel').classList.add('admin-hidden');
      $('dashboard').classList.remove('admin-hidden');
      $('whoami').textContent = currentUser.email + ' — مدیر مجاز مکتب';
      await loadBranch();
      await Promise.all([loadAnnouncements(), loadGallery()]);
    } catch (error) {
      await db.auth.signOut();
      $('login-status').textContent = error.message || 'دسترسی تأیید نشد.';
    }
  }

  $('password-login').addEventListener('click', async () => {
    const email = $('login-email').value.trim();
    const password = $('login-password').value;
    if (!email || !password) { $('login-status').textContent = 'ایمیل و رمز عبور را وارد کنید.'; return; }
    $('password-login').disabled = true;
    $('login-status').textContent = 'در حال بررسی اطلاعات ورود...';
    const { error } = await db.auth.signInWithPassword({ email, password });
    $('password-login').disabled = false;
    if (error) { $('login-status').textContent = 'ورود انجام نشد. ایمیل و رمز عبور را بررسی کنید.'; return; }
    await start();
  });
  $('login-password').addEventListener('keydown', event => { if (event.key === 'Enter') $('password-login').click(); });
  $('sign-out').addEventListener('click', async () => { await db.auth.signOut(); location.reload(); });

  async function loadBranch() {
    const { data, error } = await db.from('branches').select('id,name,address,phone,morning_hours,afternoon_hours,description,image_url,sort_order').order('sort_order', { ascending: true }).order('id', { ascending: true }).limit(1).maybeSingle();
    if (error) throw error;
    branch = data || { id: null, name: 'لیسه عالی خصوصی تابش نور', address: 'پروژه خالد ابن ولید قسمت اول، جنوب پارک خالد ابن ولید', phone: '', morning_hours: '۷:۰۰ الی ۱۲:۲۰', afternoon_hours: '۱:۰۰ الی ۴:۳۵', description: 'صنف‌های اول الی دوازدهم' };
    $('school-name').value = branch.name || '';
    $('school-address').value = branch.address || '';
    $('school-phone').value = branch.phone || '';
    $('morning-hours').value = branch.morning_hours || '';
    $('afternoon-hours').value = branch.afternoon_hours || '';
    $('school-description').value = branch.description || '';
  }

  $('save-school').addEventListener('click', async () => {
    const payload = {
      name: $('school-name').value.trim(),
      address: $('school-address').value.trim(),
      phone: $('school-phone').value.trim(),
      morning_hours: $('morning-hours').value.trim(),
      afternoon_hours: $('afternoon-hours').value.trim(),
      description: $('school-description').value.trim()
    };
    let result;
    if (branch?.id != null) {
      result = await db.from('branches').update(payload).eq('id', branch.id);
    } else {
      result = await db.from('branches').insert(payload).select('id').single();
      if (!result.error) payload.id = result.data.id;
    }
    if (result.error) { status('ذخیره نشد: ' + result.error.message); return; }
    branch = { ...branch, ...payload };
    status('معلومات مکتب با موفقیت ذخیره شد.');
  });

  async function loadAnnouncements() {
    const { data, error } = await db.from('announcements').select('id,title,body,published,created_at').order('created_at', { ascending: false });
    if (error) { status('بارگذاری خبرها ناموفق بود: ' + error.message); return; }
    $('announcements-list').innerHTML = (data || []).map(item => `<div class="admin-item"><div><strong>${escapeHtml(item.title)}</strong><div class="admin-note">${escapeHtml(item.body)}</div><small>${item.published ? 'نشر شده' : 'پیش‌نویس'}</small></div><button class="admin-btn danger" data-delete-announcement="${escapeHtml(item.id)}">حذف</button></div>`).join('') || '<p class="admin-note">هنوز اطلاعیه‌ای ثبت نشده است.</p>';
  }
  $('add-announcement').addEventListener('click', async () => {
    const title = $('announcement-title').value.trim();
    const body = $('announcement-body').value.trim();
    if (!title || !body) { status('عنوان و متن اطلاعیه را وارد کنید.'); return; }
    const { error } = await db.from('announcements').insert({ title, body, published: true });
    if (error) { status('اطلاعیه نشر نشد: ' + error.message); return; }
    $('announcement-title').value = '';
    $('announcement-body').value = '';
    await loadAnnouncements();
    status('اطلاعیه نشر شد.');
  });
  $('announcements-list').addEventListener('click', async event => {
    const id = event.target.dataset.deleteAnnouncement;
    if (!id) return;
    const { error } = await db.from('announcements').delete().eq('id', id);
    if (error) { status('حذف اطلاعیه ناموفق بود: ' + error.message); return; }
    await loadAnnouncements();
    status('اطلاعیه حذف شد.');
  });

  async function loadGallery() {
    const { data, error } = await db.from('gallery_items').select('id,title,description,storage_path,published,created_at').order('created_at', { ascending: false });
    if (error) { status('بارگذاری گالری ناموفق بود: ' + error.message); return; }
    $('gallery-list').innerHTML = (data || []).map(item => {
      const imageUrl = db.storage.from('school-media').getPublicUrl(item.storage_path).data.publicUrl;
      return `<div class="admin-item"><img src="${escapeHtml(imageUrl)}" alt=""><span>${escapeHtml(item.title || item.description || 'تصویر گالری')}</span><button class="admin-btn danger" data-delete-gallery="${escapeHtml(item.id)}" data-storage-path="${escapeHtml(item.storage_path)}">حذف</button></div>`;
    }).join('') || '<p class="admin-note">هنوز تصویری بارگذاری نشده است.</p>';
  }
  $('upload-image').addEventListener('click', async () => {
    const file = $('gallery-file').files[0];
    if (!file) { status('اول یک تصویر انتخاب کنید.'); return; }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { status('فقط تصویر JPG، PNG یا WebP قابل بارگذاری است.'); return; }
    if (file.size > 8 * 1024 * 1024) { status('حجم هر تصویر باید کمتر از ۸ مگابایت باشد.'); return; }
    const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
    const path = `1/${crypto.randomUUID()}.${ext}`;
    status('در حال بارگذاری تصویر...');
    const upload = await db.storage.from('school-media').upload(path, file, { upsert: false, contentType: file.type });
    if (upload.error) { status('بارگذاری تصویر ناموفق بود: ' + upload.error.message); return; }
    const { error } = await db.from('gallery_items').insert({ title: file.name, description: '', storage_path: path, published: true });
    if (error) {
      await db.storage.from('school-media').remove([path]);
      status('ثبت تصویر در گالری ناموفق بود: ' + error.message);
      return;
    }
    $('gallery-file').value = '';
    await loadGallery();
    status('تصویر به گالری اضافه شد.');
  });
  $('gallery-list').addEventListener('click', async event => {
    const id = event.target.dataset.deleteGallery;
    if (!id) return;
    const path = event.target.dataset.storagePath;
    const { error } = await db.from('gallery_items').delete().eq('id', id);
    if (error) { status('حذف تصویر ناموفق بود: ' + error.message); return; }
    if (path) {
      const removal = await db.storage.from('school-media').remove([path]);
      if (removal.error) { status('رکورد حذف شد، اما فایل تصویر حذف نشد: ' + removal.error.message); await loadGallery(); return; }
    }
    await loadGallery();
    status('تصویر حذف شد.');
  });

  start().catch(error => { $('login-status').textContent = error.message; });
})();
