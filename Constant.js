const { buttonclass } = require("./buttonclass");
var key = {};
//test change
//#endregion
//#region main token...
// const ttoken = '686260796:AAHf5GTSQBLTDGu-POkQTliA_NCfbEga814';
// const gtoken = '5d82f9a31d2371743e015cf8d4095a861569a48b57e625a08e6411e643e54e01'
// const btoken = 'wss://api.bale.ai/v1/bots/34ee5d5573c7371338b34c3c6e6d07af2c8ccfe8'
// const stoken = "https://bot.sapp.ir/piKBXezlook7Evje1bCOzgsp3_pnPKKCa077j3rl_Pf8_htFcHAujrj5eGLRrOXpUyG9f297uuHO6QNxkNOhOkCfB7K-LLhh9SgheCQDFqXcaKmNHfxy18L8GglU8dteoFF7LLfJQhp9REln";
// const s2token = "https://bot.sapp.ir/iZVYt6vAeA9XPR1rAgM6oUMDM8u7TJoHb8Luyyh4iUQJlcqNgpHIMe1sULtKM438FRGZ0xKVIM5k92-6dhuw3_Dej7set2eICq6l5ET2AWB7hCJPgm-LCHR2uidQ9jFC6df79blZx-WekhtR";
//#endregion
//#region test token...
const ttoken = '662419635:AAH-Oi0jr3GZPB0vNZSCVZ8NB1zH49Y4sXU';
exports.ttoken = ttoken;
const gtoken = '73f0bc691e635189577ade8eab87eaf2cfad413e642453b4858f334569e14446';
exports.gtoken = gtoken;
const btoken = 'wss://api.bale.ai/v1/bots/56b035d4df0f5350b448485827503fda26e6378f';
exports.btoken = btoken;
const stoken = "https://bot.sapp.ir/tbpkkKuiex7GJiNEaennstVYK1s16_yGaiHWQOUCFkAuzxNrpdTVZ56uJmw82M40foT2p4zTbWkIA5r24ijQXnE8SpJOnYWfdnTfrXglXy2qcxazqfOJmvveZFTy6Km-scpYEmSCCmhvNyRR";
exports.stoken = stoken;
const s2token = "https://bot.sapp.ir/9VHRKjA5AfkYu8Lsvhe88TevaIapjWdQxLPNCkd_3QvIcH62bwJQfuunU0nLPCLuwt-ID6OuNlu8HArZjcwzd1DyXfUMGfl5TTkYQuV2Qy4g-HGLfBchXt6ZmjY-1Q9sma6aFB0hG_U8eH8K";
exports.s2token = s2token;
//#endregion
//#region Connect to Bots and Messages...
//#region Button Definition...
key.start = new buttonclass([[["شروع چت تصادفی", "/runcommand"], ["تنظیمات و راهنما", "/setting"]]]);
key.startgap = new buttonclass([["✅شروع چت تصادفی", "/runcommand"]]);
key.stop = new buttonclass([["انصراف", "/backcommand"]]);
key.command = new buttonclass([[["چت جدید", "/runcommand"], ["بازگشت", "/backcommand"]]]);
key.setting = new buttonclass([[["بلاک کردن", "/blocking"], ["راهنما", "/help"]], [["بلاک و گزارش تخلف", "/report"], ["بازگشت", "/backcommand"]]]);
key.yon = new buttonclass([[["بله", "/yes"], ["خیر", "/no"]]]);
var notsupportsmg = '⚡️پیام ربات: ارسال پیام های غیر متنی صرفا در پیام رسان های همسان پشتیبانی می شود.';
exports.notsupportsmg = notsupportsmg;
var blocktitle = "شما به دلیل نقض قوانین بلاک شده اید! لطفا به اصلاح خود بپردازید.";
exports.blocktitle = blocktitle;
var counttitle = "در هر ساعت تنها 10 چت می توانید انجام دهید!\nلطفا یک ساعت دیگر وارد بات شوید یا با ادمین (@Orotat) جهت اعتبار سنجی تماس حاصل فرمایید.";
exports.counttitle = counttitle;
var waittitle = "⚠️تا زمان ورود شخص دیگر لطفا منتظر بمانید!";
exports.waittitle = waittitle;
var starttitle = "👥 هم اکنون می توانید چت را شروع کنید!\n📩 لازم به ذکر است ارسال پیام های غیر متنی مانند تصویر و ویدئو در پیام رسان غیر همسان و تلگرام پشتیبانی نمی شود.";
exports.starttitle = starttitle;
var welcometitle = `🌺به بات چت تصادفی خوش آمدید.🌺
💫برای شروع چت با شخص دیگر به طور تصادفی بر روی "شروع چت تصادفی" کلیک کنید.
💫مشخصات شما بطور کامل ناشناس است و بات نیز به ذخیره مشخصات شما نمی پردازد.🕶
💫شما با استفاده از بات چت تصادفی می توانید با کاربران پیام رسان های دیگر نیز چت کنید.
💫بات چت تصادفی در پیام رسان های سروش(برترین پیام رسان ایرانی)، بله، گپ و تلگرام با نام @ChanceChatBot قابل استفاده است.
💫ارتباط با ما: @Orotat`;
exports.welcometitle = welcometitle;
var helptitle = `💫شما در هر ساعت می توانید 10 چت را انجام دهید.
💫مشخصات شما بطور کامل ناشناس است و بات نیز به ذخیره مشخصات شما نمی پردازد.🕶
💫برای بلاک کردن آخرین فردی که چت کرده اید یا در حال چت هستید، از گزینه "بلاک کردن" استفاده کنید.
💫آدرس چت تصادفی در پیام رسان های مختلف:
سروش: @ChanceChatBot
تلگرام: @ChanceChatBot
گپ: @ChanceChatBot
بله: @ChanceChatBot
💫ارتباط با ما: @Orotat`;
exports.helptitle = helptitle;
var settingtitle = "لطفا یکی از گزینه ها را  انتخاب کنید.";
exports.settingtitle = settingtitle;
var isbloctitle = "آیا مایل به بلاک کردن آخرین فردی که با آن چت کرده اید یا هم اکنون چت می کنید هستید؟";
exports.isbloctitle = isbloctitle;
var isreptitle = `
آیا مایل به گزارش تخلف آخرین فردی که با آن چت کرده اید یا هم اکنون چت می کنید هستید؟
عملکرد گزارش به نحوی است که اگر شخصی توسط 3 نفر گزارش داده شود، از سمت بات برای همیشه بلاک می گردد. (بات امکان امکان پایش بر روی محتوای پیام ها را ندارد!)`;
exports.isreptitle = isreptitle;
var canceltitle = "🌑 متاسفانه شخص مقابل شما از ادامه چت انصراف داده است.";
exports.canceltitle = canceltitle;
exports.key = key;
