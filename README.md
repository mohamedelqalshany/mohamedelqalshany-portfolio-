# الموقع التعريفي الرسمي — محمد القلشاني
## Mohamed El-Qalshany — Official Voice Over & Full-Cycle Marketing Portfolio

موقع تعريفي واحترافي متكامل ثنائي المسار (تعليق صوتي محترف + تسويق رقمي وصناعة إعلانات One-Man Crew)، مبني بتقنية **Astro 5 SSG** فائقة السرعة، متوافق 100% مع معايير الويب العالمية، ويدعم اللغتين العربية والإنجليزية مع الوضعين الليلي والنهاري.

---

## 🚀 خطوات النشر والاستضافة المجانية عبر GitHub و Cloudflare Pages

### الخطوة 1: إنشاء حساب على GitHub
1. ادخل إلى موقع [GitHub.com](https://github.com/) واضغط على **Sign Up**.
2. أدخل بريدك الإلكتروني، واختر كلمة مرور قوية، ثم اسم مستخدم (Username) مناسب.
3. قم بتأكيد الحساب عبر الرمز المرسل إلى بريدك الإلكتروني.

---

### الخطوة 2: إنشاء مستودع جديد (New Repository)
1. بعد تسجيل الدخول على GitHub، اضغط على علامة **`+`** أعلى يمين الصفحة، ثم اختر **New repository**.
2. في خانة **Repository name**، اكتب اسماً للمشروع (مثال: `mohamed-elqalshany-portfolio` أو `portfolio`).
3. اضبط الخصوصية على **Public** (عام) لتسهيل ربطه بـ Cloudflare.
4. اترك خانة "Initialize with README" غير محددة (لأن الملفات جاهزة بالفعل).
5. اضغط على الزر الأخضر: **Create repository**.

---

### الخطوة 3: رفع ملفات المشروع إلى GitHub
يمكنك رفع الملفات بإحدى طريقتين:

#### الطريقة الأولى: السحب والإفلات مباشرة من المتصفح (الأسهل بدون أوامر)
1. فك ضغط ملف المشروع المرفق `MohamedEl-Qalshany-Portfolio.zip`.
2. في صفحة المستودع الجديد على GitHub، اضغط على الرابط: **uploading an existing file**.
3. قم بسحب وإفلات جميع الملفات والمجلدات الموجودة داخل مجلد المشروع (مجلد `src`، مجلد `public`، ملف `package.json`، ملف `astro.config.mjs`، إلخ).
4. في الأسفل اكتب في مربع الرسالة: `Initial commit` ثم اضغط على الزر الأخضر **Commit changes**.

#### الطريقة الثانية: عبر سطر الأوامر (Git CLI للمحترفين)
داخل مجلد المشروع بعد فك الضغط، افتح Terminal أو PowerShell ونفّذ:
```bash
git init
git add .
git commit -m "feat: launch official portfolio"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git push -u origin main
```
*(استبدل USERNAME و REPO_NAME برابط المستودع الخاص بك).*

---

### الخطوة 4: إنشاء حساب Cloudflare مجاني
1. ادخل إلى موقع [Cloudflare.com](https://www.cloudflare.com/) واضغط على **Sign Up**.
2. أدخل بريدك الإلكتروني وكلمة المرور (لا يتطلب أي بطاقة بنكية - مجاني 100%).
3. بعد تسجيل الدخول، توجه إلى القائمة الجانبية واختر: **Compute (Workers & Pages)** أو **Workers & Pages**.

---

### الخطوة 5: ربط Cloudflare بمستودع GitHub
1. داخل صفحة **Workers & Pages**، اضغط على زر **Create** (أو **Create Application**).
2. اختر التبويب: **Pages**.
3. اضغط على **Connect to Git** (الاتصال بـ Git).
4. اضغط على **Connect GitHub** وامنح الصلاحية لـ Cloudflare للوصول إلى المستودع الذي أنشأته (`mohamed-elqalshany-portfolio`).
5. اختر المستودع واضغط على **Begin setup**.

---

### الخطوة 6: إعدادات البناء (Build Settings)
في شاشة الإعدادات، تأكد من إدخال القيم التالية:
* **Project name**: اتركه كما هو أو اختر اسماً من اختيارك (سيكون رابط موقعك: `https://your-name.pages.dev`).
* **Production branch**: `main`
* **Framework preset**: اختر **Astro** من القائمة المنسدلة.
* **Build command**: `npm run build`
* **Build output directory**: `dist`
* **Environment variables** (اختياري):
  * أضف متغيراً باسم `NODE_VERSION` وقيمته `20` أو `22` لضمان أسرع أداء للبناء.

اضغط على الزر: **Save and Deploy**.

---

### الخطوة 7: مبروك! موقعك الآن متاح عالمياً 🌍
* سيقوم Cloudflare ببناء الموقع تلقائياً خلال دقيقة واحدة تقريباً.
* ستظهر لك رسالة نجاح مع رابط مجاني سريع جداً مع شهادة أمان SSL مجانية، مثال:
  `https://mohamed-elqalshany.pages.dev`
* **الميزة الذهبية**: في أي وقت تقوم فيه بتحديث أي ملف ورفعه على GitHub، سيقوم Cloudflare بتحديث الموقع مباشرة وبشكل آلي فوراً!

---

### 🌐 ربط نطاق خاص (Custom Domain) مثل `mohamedelqalshany.com`:
1. داخل مشروعك على Cloudflare Pages، اضغط على تبويب **Custom domains**.
2. اضغط **Set up a custom domain**.
3. اكتب اسم الدومين الخاص بك واتبع الخطوات البسيطة للربط السريع مجاناً.
