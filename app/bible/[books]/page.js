'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useState } from 'react'

export default function Chapters() {

    const [activeButton, setActiveButton] = useState(null)

    const oldTestamentBooks = [
        { urdu: 'تکوِین', english: 'Genesis', href: '/bible/old-testament/genesis', title: 'توریت' },
        { urdu: 'خُرُوج', english: 'Exodus', href: '/bible/old-testament/exodus', title: 'توریت' },
        { urdu: 'اَحبار', english: 'Leviticus', href: '/bible/old-testament/leviticus', title: 'توریت' },
        { urdu: 'عدد', english: 'Numbers', href: '/bible/old-testament/numbers', title: 'توریت' },
        { urdu: 'تثینہ ء شرع', english: 'Deuteronomy', href: '/bible/old-testament/deuteronomy', title: 'توریت' },
        { urdu: 'یوشُع', english: 'Joshua', href: '/bible/old-testament/joshua', title: 'تواریخی کِتابیں' },
        { urdu: 'قُضّات', english: 'Judges', href: '/bible/old-testament/judges', title: 'تواریخی کِتابیں' },
        { urdu: 'راعوت', english: 'Ruth', href: '/bible/old-testament/ruth', title: 'تواریخی کِتابیں' },
        { urdu: '۱۔سمُوئیل', english: '1 - Samuel', href: '/bible/old-testament/1-samuel', title: 'تواریخی کِتابیں' },
        { urdu: '۲۔سمُوئیل', english: '2 - Samuel', href: '/bible/old-testament/2-samuel', title: 'تواریخی کِتابیں' },
        { urdu: '۱۔ملوک', english: '1 - Kings', href: '/bible/old-testament/1-kings', title: 'تواریخی کِتابیں' },
        { urdu: '۲۔ملوک', english: '2 - Kings', href: '/bible/old-testament/2-kings', title: 'تواریخی کِتابیں' },
        { urdu: '۱۔اَخبار', english: '1 - Chronicles', href: '/bible/old-testament/1-chronicles', title: 'تواریخی کِتابیں' },
        { urdu: '۲۔اَخبار', english: '2 - Chronicles', href: '/bible/old-testament/2-chronicles', title: 'تواریخی کِتابیں' },
        { urdu: 'عِزرا', english: 'Ezra', href: '/bible/old-testament/ezra', title: 'تواریخی کِتابیں' },
        { urdu: 'نِحِم یاہ', english: 'Nehemiah', href: '/bible/old-testament/nehemiah', title: 'تواریخی کِتابیں' },
        { urdu: 'طوبیاہ', english: 'Tobit', href: '/bible/old-testament/tobit', title: 'تواریخی کِتابیں' },
        { urdu: 'یہُودیت', english: 'Judith', href: '/bible/old-testament/judith', title: 'تواریخی کِتابیں' },
        { urdu: 'استیر', english: 'Esther', href: '/bible/old-testament/esther', title: 'تواریخی کِتابیں' },
        { urdu: '۱۔مَکابیّین', english: '1 - Maccabees', href: '/bible/old-testament/1-maccabees', title: 'تواریخی کِتابیں' },
        { urdu: '۲۔مَکابیّین', english: '2 - Maccabees', href: '/bible/old-testament/2-maccabees', title: 'تواریخی کِتابیں' },
        { urdu: 'ایُوّب', english: 'Job', href: '/bible/old-testament/job', title: 'حِکمَت کی کِتابیں' },
        { urdu: 'مزامیر', english: 'Psalms', href: '/bible/old-testament/psalms', title: 'حِکمَت کی کِتابیں' },
        { urdu: 'اَمثال', english: 'Proverbs', href: '/bible/old-testament/proverbs', title: 'حِکمَت کی کِتابیں' },
        { urdu: 'جامع', english: 'Ecclesiastes', href: '/bible/old-testament/ecclesiastes', title: 'حِکمَت کی کِتابیں' },
        { urdu: 'نشیدالاناشید', english: 'Songs of Solomon', href: '/bible/old-testament/songs-of-solomon', title: 'حِکمَت کی کِتابیں' },
        { urdu: 'حِکمَت', english: 'Wisdom', href: '/bible/old-testament/wisdom', title: 'حِکمَت کی کِتابیں' },
        { urdu: 'یِشُوع بن سیراخ', english: 'Sirach', href: '/bible/old-testament/sirach', title: 'حِکمَت کی کِتابیں' },
        { urdu: 'اِشعیا', english: 'Isaiah', href: '/bible/old-testament/isaiah', title: 'انبیاءکُبریٰ' },
        { urdu: 'اِرمیا', english: 'Jeremiah', href: '/bible/old-testament/jeremiah', title: 'انبیاءکُبریٰ' },
        { urdu: 'مَرثِیے', english: 'Lamentations', href: '/bible/old-testament/lamentations', title: 'انبیاءکُبریٰ' },
        { urdu: 'بارُوک', english: 'Baruch', href: '/bible/old-testament/baruch', title: 'انبیاءکُبریٰ' },
        { urdu: 'حزقیال', english: 'Ezekiel', href: '/bible/old-testament/ezekiel', title: 'انبیاءکُبریٰ' },
        { urdu: 'دانیال', english: 'Daniel', href: '/bible/old-testament/daniel', title: 'انبیاءکُبریٰ' },
        { urdu: 'ہوشیعَ', english: 'Hosea', href: '/bible/old-testament/hosea', title: 'انبیاءصُغریٰ' },
        { urdu: 'یوئیل', english: 'Joel', href: '/bible/old-testament/joel', title: 'انبیاءصُغریٰ' },
        { urdu: 'عامُوس', english: 'Amos', href: '/bible/old-testament/amos', title: 'انبیاءصُغریٰ' },
        { urdu: 'عوبَدیاہ', english: 'Obadiah', href: '/bible/old-testament/obadiah', title: 'انبیاءصُغریٰ' },
        { urdu: 'یونس', english: 'Jonah', href: '/bible/old-testament/jonah', title: 'انبیاءصُغریٰ' },
        { urdu: 'میکا', english: 'Micah', href: '/bible/old-testament/micah', title: 'انبیاءصُغریٰ' },
        { urdu: 'نحُوم', english: 'Nahum', href: '/bible/old-testament/nahum', title: 'انبیاءصُغریٰ' },
        { urdu: 'حبقُوق', english: 'Habakkuk', href: '/bible/old-testament/habakkuk', title: 'انبیاءصُغریٰ' },
        { urdu: 'صفن یاہ', english: 'Zephaniah', href: '/bible/old-testament/zephaniah', title: 'انبیاءصُغریٰ' },
        { urdu: 'حجّائی', english: 'Haggai', href: '/bible/old-testament/haggai', title: 'انبیاءصُغریٰ' },
        { urdu: 'زِکریاہ', english: 'Zechariah', href: '/bible/old-testament/zechariah', title: 'انبیاءصُغریٰ' },
        { urdu: 'ملاکی', english: 'Malachi', href: '/bible/old-testament/malachi', title: 'انبیاءصُغریٰ' },
    ];

    const newTestamentBooks = [
        { urdu: 'بمُطابِق متّی', english: 'Matthew', href: '/bible/new-testament/matthew', title: 'اِنجیلِ مُقدّس' },
        { urdu: 'بمُطابِق مرقس', english: 'Mark', href: '/bible/new-testament/mark', title: 'اِنجیلِ مُقدّس' },
        { urdu: 'بمُطابِق لُوقا', english: 'Luke', href: '/bible/new-testament/luke', title: 'اِنجیلِ مُقدّس' },
        { urdu: 'بمُطابِق یُوحنّا', english: 'John', href: '/bible/new-testament/john', title: 'اِنجیلِ مُقدّس' },
        { urdu: 'رسُولوں کےاعمال', english: 'Acts', href: '/bible/new-testament/acts', title: 'اِنجیلِ مُقدّس' },
        { urdu: 'رومیوں کےنام', english: 'Romans', href: '/bible/new-testament/romans', title: 'خطوطِ پَولُوس رسُول' },
        { urdu: '۱۔قرنتیوں کے نام', english: '1 - Corinthians', href: '/bible/new-testament/1-corinthians', title: 'خطوطِ پَولُوس رسُول' },
        { urdu: '۲۔قرنتیوں کے نام', english: '2 - Corinthians', href: '/bible/new-testament/2-corinthians', title: 'خطوطِ پَولُوس رسُول' },
        { urdu: 'غلاطیوں کےنام', english: 'Galatians', href: '/bible/new-testament/galatians', title: 'خطوطِ پَولُوس رسُول' },
        { urdu: 'افسیوں کےنام', english: 'Ephesians', href: '/bible/new-testament/ephesians', title: 'خطوطِ پَولُوس رسُول' },
        { urdu: 'فیلپِیوں کےنام', english: 'Philippians', href: '/bible/new-testament/philippians', title: 'خطوطِ پَولُوس رسُول' },
        { urdu: 'کلُسیوں کےنام', english: 'Colossians', href: '/bible/new-testament/colossians', title: 'خطوطِ پَولُوس رسُول' },
        { urdu: '۱۔تسالونیکیوں کے نام', english: '1 - Thessalonians', href: '/bible/new-testament/1-thessalonians', title: 'خطوطِ پَولُوس رسُول' },
        { urdu: '۲۔تسالونیکیوں کے نام', english: '2 - Thessalonians', href: '/bible/new-testament/2-thessalonians', title: 'خطوطِ پَولُوس رسُول' },
        { urdu: '۱۔تیموتاؤس کے نام', english: '1 - Timothy', href: '/bible/new-testament/1-timothy', title: 'خطوطِ پَولُوس رسُول' },
        { urdu: '۲۔تیموتاؤس کے نام', english: '2 - Timothy', href: '/bible/new-testament/2-timothy', title: 'خطوطِ پَولُوس رسُول' },
        { urdu: 'طیطُس کےنام', english: 'Titus', href: '/bible/new-testament/titus', title: 'خطوطِ پَولُوس رسُول' },
        { urdu: 'فلیمون کےنام', english: 'Philemon', href: '/bible/new-testament/philemon', title: 'خطوطِ پَولُوس رسُول' },
        { urdu: 'عِبرانیوں کےنام', english: 'Hebrews', href: '/bible/new-testament/hebrews', title: 'خطوطِ پَولُوس رسُول' },
        { urdu: 'ازیعقُوب', english: 'James', href: '/bible/new-testament/james', title: 'خطوطِ عام' },
        { urdu: '۱۔ازپطرس', english: '1 - Peter', href: '/bible/new-testament/1-peter', title: 'خطوطِ عام' },
        { urdu: '۲۔ازپطرس', english: '2 - Peter', href: '/bible/new-testament/2-peter', title: 'خطوطِ عام' },
        { urdu: '۱۔ازیُوحنّا', english: '1 - John', href: '/bible/new-testament/1-john', title: 'خطوطِ عام' },
        { urdu: '۲۔ازیُوحنّا', english: '2 - John', href: '/bible/new-testament/2-john', title: 'خطوطِ عام' },
        { urdu: '۳۔ازیُوحنّا', english: '3 - John', href: '/bible/new-testament/3-john', title: 'خطوطِ عام' },
        { urdu: 'ازیہُودہ', english: 'Jude', href: '/bible/new-testament/jude', title: 'خطوطِ عام' },
        { urdu: 'مُکاشفہ', english: 'Revelation', href: '/bible/new-testament/revelation', title: 'نُبوّت کی کِتاب' },
    ];

    const pathname = usePathname();

    // Select dataset based on route
    const students = pathname.includes('old-testament')
        ? oldTestamentBooks
        : pathname.includes('new-testament')
            ? newTestamentBooks
            : [];

    const groupedByGrade = students.reduce((acc, item) => {
        if (!acc[item.title]) {
            acc[item.title] = {
                title: item.title,
                items: []
            };
        }
        acc[item.title].items.push(item);
        return acc;
    }, {});

    const orderedGroups = Object.values(groupedByGrade);

    return (
        <div className="flex flex-col gap-8 my-4 px-2">
            {orderedGroups.map((group) => (
                <div key={group.title}>

                    {/* Heading */}                  
                        <h2 className="flex border-b-2 justify-center items-center text-2xl urdu text-foreground py-4 px-15 rounded-sm md:text-3xl font-bold mx-auto mb-4">
                            {group.title}
                        </h2>
                    

                    {/* Cards */}
                    <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(160px,1fr))] md:grid-cols-3">
                        {group.items.map((book) => (
                            <Link
                                key={book.english}
                                href={book.href}
                            >
                                <Button
                                    onClick={() => setActiveButton(book.english)}
                                    disabled={activeButton === book.english}
                                    variant="secondary"
                                    className="w-full text-lg md:text-2xl py-12 md:py-15 flex flex-col items-center"
                                >
                                    {activeButton === book.english ? (
                                        "Loading Chapters..."
                                    ) : (
                                        <>
                                            <span className="font-bold">{book.english}</span>
                                            <span className="urdu font-bold">{book.urdu}</span>
                                        </>
                                    )}
                                </Button>
                            </Link>
                        ))}
                    </div>

                </div>
            ))}
        </div>
    );
}