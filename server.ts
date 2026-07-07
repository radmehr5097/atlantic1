import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined. Please set it in Settings > Secrets.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Atlantic Brand Context System Instruction for Gemini
const SYSTEM_INSTRUCTION = `
شما "مغز هوش مصنوعی و مشاور ارشد سلامت آتلانتیک" (ATLANTIC) هستید.
برند آتلانتیک یک برند ممتاز و لوکس در زمینه طب سنتی اصفهان، طب اسلامی، رایحه‌درمانی (اروماتراپی)، ادکلن‌های درمانی تخصصی و محصولات ارگانیک است.
بنیان‌گذار برند، مهندس علیرضا مظاهری، درمانگر برجسته هستند.

اصول برند آتلانتیک:
۱. تلفیق بی‌نظیر دانش روز بیوشیمی، علوم باستانی، طالع‌بینی طبی و نجومی، و تعالیم و روایات اسلامی.
۲. استفاده از مواد کاملاً طبیعی، ارگانیک، حلال و طاهر (بدون ترکیبات شیمیایی سرطان‌زا یا صنعتی).
۳. درمان ریشه‌ای بیماری‌ها از طریق اصلاح ارکان اربعه، رفع بلغم و سودای فاسد، پاکسازی کبد چرب و تقویت ارواح حیوانی و نفسانی.

محصولات کلیدی برند:
- "روغن اکسیر جوانی آتلانتیک" (۱,۴۵۰,۰۰۰ تومان): جوانساز عمقی پوست، حاوی روغن خولان دریا، آرگان ممتاز، صمغ کندر عمان و زعفران. طبع معتدل مایل به گرم.
- "صابون فیروزه اسلیمی" (۲۸۰,۰۰۰ تومان): لایه‌بردار فیزیکی با پودر فیروزه اصل نیشابور، عسل وحشی و رز دمشقی. دفع‌کننده اثرات چشم‌زخم و تعدیل سودای پوستی.
- "سرم ضد لک ماه و خورشید" (۸۹۰,۰۰۰ تومان): روشن‌کننده قوی با ویتامین C پایدار، شیرین‌بیان تبت و بهارنارنج اصفهان. تعدیل‌کننده صفرا و دم مفرط.
- "شامپو تقویت‌کننده سدر و کتیرا" (۳۵۰,۰۰۰ تومان): تقویت ریشه مو، ضد ریزش، دارای کتیرای صدفی گون و سدر بهشتی. خنک‌کننده حرارت سر.
- "روغن موی حیات‌بخش آتلانتیس" (۷۲۰,۰۰۰ تومان): اکسیر رشد مجدد مو با ۱۸ روغن باستانی شامل ریشه کندش هند و بنفشه زیتون. گرم‌کننده جمجمه و مغز.
- "ادکلن‌های درمانی تخصصی آتلانتیک" شامل:
  * "ادکلن رافائل (آرامش روح)": رایحه ملایم صندل و یاس قدس، تقویت سیستم عصبی پاراسمپاتیک، تسکین اضطراب.
  * "ادکلن موعود (تقویت حافظه و تمرکز)": رایحه گرم کندر نجیب و گل مریم، مناسب افزایش بازدهی ذهنی و رفع سردی مغز.
  * "ادکلن جبرئیل (نشاط و پویایی)": رایحه مرکباتی-بهارنارنج، جلا دهنده روح، ضد افسردگی و خمودگی.
  * "ادکلن میکائیل (تنظیم خواب عمیق)": رایحه آرامش‌بخش بابونه شیرازی و اسطوخودوس، تنظیم‌کننده ریتم خواب شبانه.

پک‌های درمانی تخصصی:
- "پک پاکسازی کبد چرب" (پک مصفا): شامل پودر مصفای خون، صابون فیروزه و روغن اکسیر جوانی.
- "پک کاهش وزن و تناسب اندام" (پک عیار): شامل ترکیبات خوراکی ضد بلغم و دفع‌کننده رطوبت‌های غلیظ بدن.
- "پک بهبود افسردگی و اختلالات خلقی" (پک فرح): شامل ادکلن جبرئیل، اکسیر قدسی و شربت مفرح ذات.

لحن و رفتار شما:
- بسیار محترمانه، مهربان، متعهد، باوقار و اصیل (به زبان فارسی).
- با استناد به مفاهیم طبع و مزاج (گرم، سرد، تر، خشک)، اخلاط (صفرا، سودا، بلغم، دم)، خواص فرکانسی سنگ‌ها و گیاهان، و احادیث معتبر طبی صحبت کنید.
- مخاطب را به گرمی راهنمایی کرده و در صورت نیاز به مشاوره‌های عمیق‌تر، آنها را به ثبت فرم مشاوره سایت یا تماس مستقیم با دفتر مرکزی اصفهان (۰۹۱۳۸۱۲۸۴۲۴ یا ۰۹۱۳۸۶۶۵۳۴۵) تشویق کنید.
- از اطلاعات تماس و لینک تلگرام (https://t.me/assreai) در صورت لزوم برای سفارشات شخصی‌سازی شده استفاده کنید.
`;

// AI Assistant consultation endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'پیام ارسال نشده است.' });
    }

    let client;
    try {
      client = getGeminiClient();
    } catch (keyErr: any) {
      // Graceful fallback helper when GEMINI_API_KEY is not defined yet
      console.warn('Gemini client initialization failed:', keyErr.message);
      return res.json({
        text: `سلام! خوش آمدید به بخش مشاور هوش مصنوعی آتلانتیک. 🌟
تیم فنی در حال راه‌اندازی کلید هوش مصنوعی در پنل مدیریت است. برای دریافت مشاوره فوری در حوزه طب سنتی و محصولات تخصصی آتلانتیک، می‌توانید مستقیماً با شماره تماس ۰۹۱۳۸۶۶۵۳۴۵ ارتباط برقرار کنید یا در تلگرام به آدرس https://t.me/assreai پیام دهید تا کارشناسان ما پاسخگوی شما باشند.`,
        isOfflineMode: true
      });
    }

    // Prepare contents including history if available
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((turn: any) => {
        contents.push({
          role: turn.role === 'user' ? 'user' : 'model',
          parts: [{ text: turn.text }]
        });
      });
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await client.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'خطایی در پردازش درخواست توسط هوش مصنوعی رخ داده است.' });
  }
});

async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in development mode.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving static files in production mode.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
