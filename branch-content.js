(async () => {
  const url = window.TABISH_SUPABASE_URL;
  const key = window.TABISH_SUPABASE_ANON_KEY;
  if (!url || !key) return;
  const db = window.supabase.createClient(url, key);
  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element && value) element.textContent = value;
  };
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
  try {
    const { data: school, error: schoolError } = await db.from('branches').select('id,name,address,phone,morning_hours,afternoon_hours,description,image_url,sort_order').order('sort_order', { ascending: true }).order('id', { ascending: true }).limit(1).maybeSingle();
    if (schoolError) throw schoolError;
    if (school) {
      setText('branch-title', school.name);
      setText('branch-address', school.address);
      setText('branch-phone', school.phone);
      const hours = [school.morning_hours, school.afternoon_hours].filter(Boolean).join(' | ');
      setText('branch-hours', hours);
      setText('branch-grades', school.description);
      const programsSection = document.getElementById('branch-programs')?.closest('.content-section');
      if (programsSection) programsSection.style.display = 'none';
    }

    const managerSection = document.getElementById('branch-manager')?.closest('.content-section');
    if (managerSection) managerSection.style.display = 'none';

    const { data: announcements, error: newsError } = await db.from('announcements').select('id,title,body,created_at').eq('published', true).order('created_at', { ascending: false });
    if (newsError) throw newsError;
    const newsList = document.getElementById('branch-news');
    if (newsList && announcements?.length) {
      newsList.innerHTML = announcements.map(item => `<article class="info-card" style="margin:12px 0"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p></article>`).join('');
    }

    const { data: photos, error: galleryError } = await db.from('gallery_items').select('id,title,description,storage_path').eq('published', true).order('created_at', { ascending: false });
    if (galleryError) throw galleryError;
    const gallery = document.getElementById('branch-gallery');
    if (gallery && photos?.length) {
      gallery.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px">${photos.map(photo => {
        const imageUrl = db.storage.from('school-media').getPublicUrl(photo.storage_path).data.publicUrl;
        const caption = photo.title || photo.description || 'تصویر مکتب';
        return `<figure><img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(caption)}" loading="lazy" style="width:100%;height:190px;object-fit:cover;border-radius:12px"><figcaption>${escapeHtml(caption)}</figcaption></figure>`;
      }).join('')}</div>`;
    }
  } catch (error) {
    console.warn('معلومات آنلاین فعلاً بارگذاری نشد:', error);
  }
})();
