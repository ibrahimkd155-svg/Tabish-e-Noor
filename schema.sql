-- این کد فقط برای تکمیل دسترسی مدیر به جدول branches است.
-- جدول‌ها و اطلاعات قبلی را حذف یا بازسازی نمی‌کند.
-- قبل از استفاده، در Supabase > SQL Editor اجرا شود.

DROP POLICY IF EXISTS "school admins insert branches" ON public.branches;
CREATE POLICY "school admins insert branches"
ON public.branches
FOR INSERT
TO authenticated
WITH CHECK (public.is_school_admin());

DROP POLICY IF EXISTS "school admins update branches" ON public.branches;
CREATE POLICY "school admins update branches"
ON public.branches
FOR UPDATE
TO authenticated
USING (public.is_school_admin())
WITH CHECK (public.is_school_admin());

-- درج معلومات واقعی مکتب فقط در صورتی که هنوز هیچ رکوردی در branches وجود نداشته باشد.
INSERT INTO public.branches (name, address, phone, morning_hours, afternoon_hours, description, sort_order)
SELECT
  'لیسه عالی خصوصی تابش نور',
  'پروژه خالد ابن ولید قسمت اول، جنوب پارک خالد ابن ولید',
  '',
  '۷:۰۰ الی ۱۲:۲۰',
  '۱:۰۰ الی ۴:۳۵',
  'صنف‌های اول الی دوازدهم',
  1
WHERE NOT EXISTS (SELECT 1 FROM public.branches);
