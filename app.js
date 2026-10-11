(function () {
  "use strict";

  const translations = {
    fa: {
      dir: "rtl", langName: "دری",
      welcomeEyebrow: "به وب‌سایت رسمی", schoolName: "مکتب تابش نور",
      chooseLanguage: "لطفاً زبان مورد نظر خود را انتخاب کنید",
      languageNote: "بعد از انتخاب زبان، می‌توانید آن را از داخل وب‌سایت تغییر دهید.",
      officialSite: "وب‌سایت رسمی", ourBranchesEyebrow: "آموزش برای آینده",
      chooseBranch: "نمایندگی مورد نظر خود را انتخاب کنید",
      branchesIntro: "برای دیدن معلومات، خبرها و گالری هر نمایندگی، کارت مربوط را انتخاب کنید.",
      branch1: "نمایندگی اول", branch2: "نمایندگی دوم", branch3: "نمایندگی سوم",
      branchCardText: "معلومات، برنامه‌ها و خبرهای این نمایندگی", viewBranch: "مشاهده نمایندگی ←",
      allRights: "تمام حقوق محفوظ است.", changeLanguage: "تغییر زبان",
      allBranches: "همه نمایندگی‌ها", welcomeToBranch: "به نمایندگی خوش آمدید",
      branchIntro: "محیطی برای یادگیری، رشد و ساختن آینده‌ای روشن.", moreInfo: "معلومات بیشتر",
      quickFacts: "معلومات عمومی", branchInformation: "معلومات نمایندگی", address: "آدرس",
      placeholderAddress: "آدرس این نمایندگی بعداً اضافه می‌شود.", schoolHours: "ساعات درسی",
      placeholderHours: "ساعات درسی بعداً اضافه می‌شود.", grades: "صنف‌ها",
      placeholderGrades: "معلومات صنف‌ها بعداً اضافه می‌شود.", phone: "شماره تماس",
      placeholderPhone: "شماره تماس بعداً اضافه می‌شود.", memories: "لحظه‌های مکتب",
      gallery: "گالری عکس و ویدیو", galleryPlaceholder: "عکس‌های مکتب بعداً اضافه می‌شود",
      videoPlaceholder: "ویدیوهای مکتب بعداً اضافه می‌شود", learning: "یادگیری و پیشرفت",
      programs: "بخش‌های آموزشی", programsText: "معلومات برنامه‌ها و بخش‌های آموزشی این نمایندگی در این قسمت نشر خواهد شد.",
      updates: "تازه‌ها", news: "خبرها و اطلاعیه‌ها",
      newsText: "خبرها و اطلاعیه‌های رسمی این نمایندگی بعداً در این قسمت منتشر می‌شود.",
      leadership: "مسئولیت نمایندگی", branchManager: "مدیر نمایندگی",
      managerPlaceholder: "عکس و معلومات مدیر نمایندگی بعداً اضافه می‌شود.",
      getInTouch: "ارتباط با ما", contact: "تماس و موقعیت",
      contactPlaceholder: "معلومات تماس و موقعیت این نمایندگی بعداً اضافه می‌شود.",
      backToBranches: "بازگشت به نمایندگی‌ها", adminTitle: "پیش‌نمایش بخش مدیریت",
      demoOnly: "این صفحه فقط نمونهٔ ظاهری است.",
      adminWarning: "در حال حاضر ورود امن، دیتابیس یا امکان واقعی نشر و ویرایش محتوا فعال نیست. برای استفادهٔ واقعی باید بخش مدیریت با سیستم احراز هویت و دیتابیس امن ساخته شود.",
      viewWebsite: "مشاهده وب‌سایت"
    },
    ps: {
      dir: "rtl", langName: "پښتو",
      welcomeEyebrow: "رسمي وېب‌پاڼې ته ښه راغلاست", schoolName: "د تابش نور ښوونځی",
      chooseLanguage: "مهرباني وکړئ خپله خوښه ژبه وټاکئ",
      languageNote: "د ژبې له ټاکلو وروسته، د وېب‌پاڼې دننه یې بدلولی شئ.",
      officialSite: "رسمي وېب‌پاڼه", ourBranchesEyebrow: "د روښانه راتلونکي لپاره زده‌کړه",
      chooseBranch: "خپله خوښه څانګه وټاکئ",
      branchesIntro: "د هرې څانګې د معلوماتو، خبرونو او انځورونو لیدلو لپاره اړوند کارت وټاکئ.",
      branch1: "لومړۍ څانګه", branch2: "دویمه څانګه", branch3: "درېیمه څانګه",
      branchCardText: "د دې څانګې معلومات، پروګرامونه او خبرونه", viewBranch: "څانګه وګورئ ←",
      allRights: "ټول حقونه خوندي دي.", changeLanguage: "ژبه بدلول",
      allBranches: "ټولې څانګې", welcomeToBranch: "څانګې ته ښه راغلاست",
      branchIntro: "د زده‌کړې، ودې او روښانه راتلونکي د جوړولو چاپېریال.", moreInfo: "نور معلومات",
      quickFacts: "عمومي معلومات", branchInformation: "د څانګې معلومات", address: "پته",
      placeholderAddress: "د دې څانګې پته به وروسته اضافه شي.", schoolHours: "د درسونو وخت",
      placeholderHours: "د درسونو وخت به وروسته اضافه شي.", grades: "ټولګي",
      placeholderGrades: "د ټولګیو معلومات به وروسته اضافه شي.", phone: "د اړیکې شمېره",
      placeholderPhone: "د اړیکې شمېره به وروسته اضافه شي.", memories: "د ښوونځي شېبې",
      gallery: "د انځورونو او ویډیوګانو ګالري", galleryPlaceholder: "د ښوونځي انځورونه به وروسته اضافه شي",
      videoPlaceholder: "د ښوونځي ویډیوګانې به وروسته اضافه شي", learning: "زده‌کړه او پرمختګ",
      programs: "ښوونیزې برخې", programsText: "د دې څانګې د ښوونیزو پروګرامونو معلومات به دلته خپاره شي.",
      updates: "تازه خبرونه", news: "خبرونه او خبرتیاوې",
      newsText: "د دې څانګې رسمي خبرونه او خبرتیاوې به وروسته دلته خپرې شي.",
      leadership: "د څانګې اداره", branchManager: "د څانګې مدیر",
      managerPlaceholder: "د مدیر انځور او معلومات به وروسته اضافه شي.",
      getInTouch: "له موږ سره اړیکه", contact: "اړیکه او موقعیت",
      contactPlaceholder: "د دې څانګې د اړیکې او موقعیت معلومات به وروسته اضافه شي.",
      backToBranches: "څانګو ته بېرته ستنېدل", adminTitle: "د مدیریت برخې مخکتنه",
      demoOnly: "دا پاڼه یوازې یوه ظاهري نمونه ده.",
      adminWarning: "اوس مهال خوندي ننوتل، ډیټابېس او د منځپانګې د خپرولو یا سمون واقعي وړتیا فعاله نه ده. د واقعي کارونې لپاره خوندي ننوتل او ډیټابېس ته اړتیا ده.",
      viewWebsite: "وېب‌پاڼه وګورئ"
    },
    en: {
      dir: "ltr", langName: "English",
      welcomeEyebrow: "Welcome to the official website", schoolName: "Tabish-e-Noor School",
      chooseLanguage: "Please select your preferred language",
      languageNote: "You can change the language later from inside the website.",
      officialSite: "Official website", ourBranchesEyebrow: "Learning for the future",
      chooseBranch: "Choose a school branch", branchesIntro: "Select a branch card to view its information, news, and gallery.",
      branch1: "Branch One", branch2: "Branch Two", branch3: "Branch Three",
      branchCardText: "Information, programs, and news for this branch", viewBranch: "View branch →",
      allRights: "All rights reserved.", changeLanguage: "Change language",
      allBranches: "All branches", welcomeToBranch: "Welcome to this branch",
      branchIntro: "A place to learn, grow, and build a brighter future.", moreInfo: "More information",
      quickFacts: "At a glance", branchInformation: "Branch information", address: "Address",
      placeholderAddress: "The branch address will be added later.", schoolHours: "School hours",
      placeholderHours: "School hours will be added later.", grades: "Grades",
      placeholderGrades: "Grade information will be added later.", phone: "Phone",
      placeholderPhone: "Contact number will be added later.", memories: "School moments",
      gallery: "Photo and video gallery", galleryPlaceholder: "School photos will be added later",
      videoPlaceholder: "School videos will be added later", learning: "Learning and growth",
      programs: "Educational programs", programsText: "Information about this branch’s educational programs will be published here.",
      updates: "Latest updates", news: "News and announcements",
      newsText: "Official news and announcements for this branch will appear here.",
      leadership: "Branch leadership", branchManager: "Branch manager",
      managerPlaceholder: "The branch manager’s photo and information will be added later.",
      getInTouch: "Get in touch", contact: "Contact and location",
      contactPlaceholder: "Contact details and location will be added later.",
      backToBranches: "Back to branches", adminTitle: "Admin area preview",
      demoOnly: "This page is a visual preview only.",
      adminWarning: "Secure sign-in, a database, and real content publishing/editing are not active yet. A secure authentication system and database are required for a real admin panel.",
      viewWebsite: "View website"
    }
  };

  function currentLanguage() {
    const saved = localStorage.getItem("tabishLanguage");
    return translations[saved] ? saved : "fa";
  }

  function applyLanguage(language) {
    const selected = translations[language] ? language : "fa";
    localStorage.setItem("tabishLanguage", selected);
    document.documentElement.lang = selected === "fa" ? "fa" : selected;
    document.documentElement.dir = translations[selected].dir;
    document.body.dir = translations[selected].dir;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (translations[selected][key]) element.textContent = translations[selected][key];
    });

    document.querySelectorAll("#language-switch").forEach((select) => {
      select.value = selected;
    });

    const title = document.getElementById("branch-title");
    if (title) {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id") || "1";
      const key = id === "2" ? "branch2" : id === "3" ? "branch3" : "branch1";
      title.textContent = translations[selected][key];
      document.title = title.textContent + " | " + translations[selected].schoolName;
    }
    document.querySelectorAll("#year").forEach((el) => el.textContent = new Date().getFullYear());
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyLanguage(currentLanguage());

    document.querySelectorAll("[data-language]").forEach((button) => {
      button.addEventListener("click", () => {
        const language = button.getAttribute("data-language");
        localStorage.setItem("tabishLanguage", language);
        window.location.href = "branches.html";
      });
    });

    document.querySelectorAll("#language-switch").forEach((select) => {
      select.addEventListener("change", () => applyLanguage(select.value));
    });

    const params = new URLSearchParams(window.location.search);
    const branchId = params.get("id");
    if (branchId && !["1", "2", "3"].includes(branchId)) {
      const title = document.getElementById("branch-title");
      if (title) title.textContent = translations[currentLanguage()].branch1;
    }
  });
})();
