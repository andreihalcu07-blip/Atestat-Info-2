/**
 * ============================================================================
 * i18n.js - Sistem de Internaționalizare (Română / Engleză)
 * ============================================================================
 * 
 * Sistem simplu și curat pentru schimbarea limbii site-ului.
 * 
 * Cum funcționează:
 * 1. Textele sunt stocate într-un obiect JavaScript (translations)
 * 2. Elementele HTML au atributul data-i18n="cheie" sau data-translate="cheie"
 * 3. La schimbarea limbii, toate textele sunt actualizate automat
 * 4. Limba selectată este salvată în localStorage
 * 
 * Utilizare:
 * - În HTML: <span data-i18n="cheie">Text implicit</span>
 * - În JS: i18n.t('cheie') sau t('cheie')
 * - Toggle: toggleLanguage() sau i18n.toggle()
 * 
 * ============================================================================
 */

(function() {
    'use strict';

    // =========================================================================
    // TRADUCERI - Adaugă aici toate textele site-ului
    // =========================================================================
    
    const translations = {
        // =====================================================================
        // ROMÂNĂ (limba implicită)
        // =====================================================================
        ro: {
            // Navigare
            nav_home: "Acasă",
            nav_about: "Despre",
            nav_history: "Istoria SO",
            nav_comparison: "Comparare",
            nav_glossary: "Glosar",
            nav_faq: "FAQ",
            nav_quiz: "Quiz",
            nav_resources: "Resurse",
            nav_contact: "Contact",
            nav_windows: "Windows",
            
            // Hero Section
            hero_title: "Evoluția Sistemelor de Operare – de la primele calculatoare la prezent",
            hero_subtitle: "Acest site prezintă evoluția sistemelor de operare, rolul lor în funcționarea calculatoarelor și diferențele dintre principalele tipuri de sisteme utilizate de-a lungul timpului.",
            hero_btn: "Începe prezentarea",
            
            // Secțiunea Ce vei învăța
            learning_title: "Ce vei învăța din acest site",
            learning_intro: "Acest material educațional acoperă principalele aspecte legate de sistemele de operare:",
            learning_what_title: "Ce este un sistem de operare",
            learning_what_desc: "Definiția și componentele principale ale unui sistem de operare, software-ul de bază care controlează un calculator.",
            learning_role_title: "Rolul sistemelor de operare",
            learning_role_desc: "Funcțiile esențiale: gestionarea memoriei, a proceselor, a fișierelor și a dispozitivelor de intrare/ieșire.",
            learning_evolution_title: "Evoluția în timp",
            learning_evolution_desc: "Istoria sistemelor de operare din anii 1950 până în prezent, cu principalele etape și inovații.",
            learning_diff_title: "Diferențe vechi vs. moderne",
            learning_diff_desc: "Comparația între sistemele de operare din trecut și cele contemporane: interfețe, performanță, securitate.",
            learning_examples_title: "Exemple importante",
            learning_examples_desc: "Prezentarea principalelor sisteme de operare: Windows, macOS, Linux, Android, iOS și altele.",
            learning_windows_title: "Evoluția Windows",
            learning_windows_desc: "Explorează vizual toate versiunile Windows de la 95 la 11, cu simulări interactive ale interfețelor originale.",
            learning_windows_btn: "Vezi Galeria Windows →",
            
            // Timeline
            timeline_title: "Timeline: Evoluția Sistemelor de Operare",
            timeline_1950s_title: "Primele Sisteme de Operare",
            timeline_1950s_systems: "UNIVAC, IBM System/360 OS",
            timeline_1950s_desc: "Primele SO au fost dezvoltate pentru calculatoarele mainframe. Acestea executau o singură sarcină la un moment dat.",
            timeline_1970s_title: "Era Unix și Multiprogramării",
            timeline_1970s_systems: "Unix (1969)",
            timeline_1970s_desc: "Unix a adus o revoluție prin portabilitate și design modular. A permis mai mulți utilizatori să lucreze simultan.",
            timeline_1980s_title: "Calculatoare Personale - DOS și Macintosh",
            timeline_1980s_systems: "MS-DOS (1981), Mac OS (1984)",
            timeline_1980s_desc: "Microsoft DOS a dominat calculatoarele personale. Apple Macintosh a introdus interfața grafică cu utilizatorul (GUI).",
            timeline_1990s_title: "Windows și Linux",
            timeline_1990s_systems: "Windows 3.0+ (1990), Linux (1991)",
            timeline_1990s_desc: "Windows a devenit dominant pe piața desktop. Linux a apărut ca alternativă open-source la Unix.",
            timeline_2000s_title: "Era Modernă",
            timeline_2000s_systems: "Windows XP (2001), macOS X, Android, iOS",
            timeline_2000s_desc: "Sistemele de operare au devenit mai stabile, mai sigure și mai ușor de folosit. Au apărut SO mobile.",
            timeline_2010s_title: "Cloud și Mobile",
            timeline_2010s_systems: "Windows 10, Chrome OS, iOS, Android",
            timeline_2010s_desc: "Integrarea cu cloud, asistenți virtuali, actualizări continue. Mobile-first și cross-platform.",
            timeline_2020s_title: "Viitorul SO",
            timeline_2020s_systems: "Windows 11, macOS Ventura+, Linux modern",
            timeline_2020s_desc: "Interfețe moderne, integrare AI, securitate avansată, suport pentru ARM și realitate virtuală.",
            
            // 3D Timeline Section
            timeline_3d_title: "🗺️ Timeline Interactiv 3D",
            timeline_3d_hint: "Trage pentru a naviga • Click pentru detalii • Scroll pentru zoom",
            timeline_btn_back: "⬅️ Înapoi",
            timeline_btn_forward: "Înainte ➡️",
            timeline_detailed_title: "O Cronologie Detaliată",
            
            // 3D Timeline Cards
            card_1950_title: "Era Mainframe",
            card_1950_desc: "Primele SO pentru calculatoare uriașe. Batch processing, carduri perforate, camere întregi.",
            card_1964_title: "IBM System/360",
            card_1964_desc: "Primul SO cu multiprogramming. Mai multe job-uri rulau simultan. O revoluție!",
            card_1969_title: "Nașterea Unix",
            card_1969_desc: "Bell Labs creează Unix. Design modular, portabil. Baza pentru toate SO-urile moderne.",
            card_1981_title: "MS-DOS",
            card_1981_desc: "Microsoft DOS pe IBM PC. Calculatoarele personale intră în case și birouri.",
            card_1984_title: "Apple Macintosh",
            card_1984_desc: "Primul GUI pentru mase. Click în loc de comenzi. Revoluția interfeței utilizator.",
            card_1985_title: "Windows 1.0",
            card_1985_desc: "Prima încercare Microsoft de GUI. Modest început pentru ce urma să domine.",
            card_1991_title: "Nașterea Linux",
            card_1991_desc: "Linus Torvalds creează Linux. Open source, gratuit, puternic. Viitorul serverelor.",
            card_1995_title: "Windows 95",
            card_1995_desc: "Punctul de cotitură. Start button, taskbar. Vândut în milioane. Dominația începe.",
            card_2001_title: "XP & OS X",
            card_2001_desc: "Windows XP stabil și popular. Mac OS X unește frumusețea cu puterea Unix.",
            card_2007_title: "Revoluția Mobilă",
            card_2007_desc: "iPhone lansează iOS. Android urmează. Miliarde au acum SO în buzunar.",
            card_2015_title: "Era Modernă",
            card_2015_desc: "Windows 10/11, Cloud, IoT, AI. SO-urile sunt peste tot. Viitorul e aici.",
            
            // Detailed Timeline Items
            detail_1950_title: "🖥️ Primii Pași - Era Mainframe",
            detail_1950_desc: "Primele sisteme de operare au fost dezvoltate pentru calculatoarele mainframe uriaşe. UNIVAC Operating System a fost unul din primele. Executau o singură sarcină la un moment dat (batch processing). Ocupau camere întregi și costau milioane de dolari.",
            detail_1964_title: "🎯 IBM System/360 OS",
            detail_1964_desc: "IBM System/360 a revoluționat industria cu sistemul său de operare care suporta multiprogramming. Aceasta a permis mai multor job-uri să ruleze \"simultan\" (în realitate, se alternau rapid). A fost un salt uriaș în eficiență.",
            detail_1969_title: "🔓 Unix - O Revoluție",
            detail_1969_desc: "Unix a fost creat la Bell Labs. A adus o abordare inovatoare: \"Fă o singură lucru și fă-o bine.\" Cu design-ul modular și portabil, Unix a deveni baza pentru o mulțime de SO-uri moderne. Scrierea în C a făcut-o ușor de portat.",
            detail_1981_title: "💻 MS-DOS și Calculatoare Personale",
            detail_1981_desc: "Microsoft DOS a lansat calculatoarele în birou și în casă. IBM PC cu MS-DOS a fost accesibil și ușor de folosit. A marcat începutul erei calculatoarelor personale. DOS a dominat piața pentru decenii.",
            detail_1984_title: "🎨 Mac OS și GUI",
            detail_1984_desc: "Apple Macintosh a introdus interfața grafică cu utilizatorul (GUI) pentru masele. Utilizatorii nu mai trebuiau să tasteze comenzi complexe. Au putut pur și simplu să dea click pe icoane. Aceasta a schimbat complet modul de utilizare a calculatoarelor.",
            detail_1985_title: "🪟 Windows 1.0",
            detail_1985_desc: "Microsoft Windows 1.0 a fost o încercare de a aduce GUI la calculatoarele DOS. Inițial lent și nepopular, Windows a evoluat și a devenit dominant pe piață. O bază pentru ce urma.",
            detail_1991_title: "🐧 Nașterea Linux",
            detail_1991_desc: "Linus Torvalds a creat Linux, un kernel inspirat de Unix. Cu ajutorul comunității open-source, Linux a crescut și a devenit un SO puternic și gratuit. Astazi domină serverele web.",
            detail_1995_title: "⭐ Windows 95 - Punctul de Cotitură",
            detail_1995_desc: "Windows 95 a marcat o schimbare majoră. A fost prieto cu utilizatorul, stabil, și a dominat piața. Butonul Start, taskbar, și design-ul intuitiv au devenit standard de facto. S-a vândut în milioane de copii.",
            detail_2001_title: "🎯 Windows XP și Mac OS X",
            detail_2001_desc: "Windows XP a fost stabil, rapid și ușor de folosit. A dominat piața pentru ani de zile. Apple a lansat Mac OS X, o combinație dintre frumusețea Mac și puterea Unix. Ambele au setat standarde noi.",
            detail_2007_title: "📱 Revoluția Mobile",
            detail_2007_desc: "iPhone (iOS) și primele telefoane Android au schimbat totul. Mobile computing a devenit mainstream. Miliarde de oameni aveau acum SO-uri în buzunar. Era cloud computing a început.",
            detail_2015_title: "🚀 Era Modernă",
            detail_2015_desc: "Windows 10/11, macOS modernă, Linux peste tot (cloud, servere, IoT). Sisteme de operare cu AI, securitate avansată, și virtualizare. Calculatoarele hibrid și IoT au apărut. Viitorul SO-urilor este aici.",
            
            // Contact
            contact_title: "Contactează-ne",
            contact_name: "Nume",
            contact_email: "Email",
            contact_message: "Mesaj",
            contact_send: "Trimite mesajul",
            
            // Footer
            footer_site: "Evoluția Sistemelor de Operare",
            footer_project: "Proiect Educațional - Atestat Informatică",
            footer_author: "Creat de",
            footer_rights: "Toate drepturile rezervate.",
            
            // Buton limbă
            lang_switch: "🇬🇧 EN",
            lang_tooltip: "Switch to English",
            
            // Pagina About
            about_title: "Despre Noi",
            about_subtitle: "Descoperiți povestea din spatele acestui site",
            about_mission_title: "🎯 Misiunea Noastră",
            about_mission_p1: "SistemOS este o platformă educativă dedicată explorării fascinante a evoluției sistemelor de operare. Scopul nostru este să faceți accesibil și ușor de înțeles parcursul extraordinar al acestor sisteme care au schimbat modul în care interacționăm cu tehnologia.",
            about_mission_p2: "De la primele calculatoare mainframe din anii 1950 până la ecosistemele complexe ale zilei de azi, sistemele de operare au jucat un rol central în revoluția digitală.",
            about_offer_title: "📚 Ce Oferim",
            about_education_title: "📖 Educație",
            about_education_desc: "Informații detaliate și ușor de înțeles despre fiecare etapă a evoluției SO-urilor",
            about_comparison_title: "🔍 Comparări",
            about_comparison_desc: "Analize comparative între diferitele sisteme de operare actuale",
            about_history_title: "📊 Istoria Detaliată",
            about_history_desc: "Timeline-ul complet cu momente semnificative și inovații",
            about_community_title: "💬 Comunitate",
            about_community_desc: "Posibilitatea de a contacta și partaja cunoștințele cu alți pasionați",
            about_why_title: "🌍 De Ce Contează SO-urile?",
            about_why_p1: "Sistemele de operare sunt \"creierul\" fiecărui calculator. Ele controlează toate resursele hardware și permit programelor să funcționeze. Fără un SO bun, calculatoarele ar fi imposibil de folosit.",
            about_why_p2: "Evoluția SO-urilor a fost marcată de:",
            about_why_list1: "✅ Trecerea de la calcul de lot la multitasking",
            about_why_list2: "✅ Introducerea interfețelor grafice (GUI)",
            about_why_list3: "✅ Accesibilitatea pentru utilizatorii obișnuiți",
            about_why_list4: "✅ Portabilitatea și compatibilitatea",
            about_why_list5: "✅ Securitatea și confidențialitatea",
            about_why_list6: "✅ Cloud computing și virtualizarea",
            about_who_title: "👥 Pentru Cine Este Util",
            about_who_students: "Studenți: În domenii de informatică, inginerie, sau orice domeniu care necesită cunoștințe IT",
            about_who_professionals: "Profesioniști: Care doresc să-și completeze cunoștințele despre baza sistemelor pe care lucrează",
            about_who_enthusiasts: "Pasionați: De tehnologie și istoria acesteia",
            about_who_educators: "Educatori: Căutând resurse pentru a preda subiecte legate de SO-uri",
            
            // Pagina History
            history_title: "Istoria Completă a SO-urilor",
            history_subtitle: "Explorează evoluția completă",
            
            // Pagina Comparison
            comparison_title: "Comparare Sisteme de Operare",
            comparison_subtitle: "Analiza detaliată a diferitelor SO actuale",
            
            // Pagina Glossary
            glossary_title: "📚 Glosar Complet al Sistemelor de Operare",
            glossary_subtitle: "Peste 50 de termeni tehnici explicați detaliat cu exemple practice",
            glossary_search: "Caută termen...",
            
            // Pagina FAQ
            faq_title: "❓ Întrebări Frecvente",
            faq_subtitle: "Răspunsuri la întrebările populare",
            
            // Pagina Resources
            resources_title: "Resurse și Lecturi",
            resources_subtitle: "Află mai mult despre sistemele de operare",
            
            // Pagina Quiz
            quiz_title: "🎯 Quiz - Testează-ți Cunoștințele",
            quiz_subtitle: "Cât de mult știi despre sistemele de operare?",
            quiz_start: "Începe Quiz-ul",
            quiz_next: "Următoarea întrebare",
            quiz_finish: "Finalizează",
            quiz_restart: "Încearcă din nou",
            quiz_score: "Scor",
            quiz_correct: "Corect!",
            quiz_wrong: "Greșit!",
            quiz_achievements: "🏆 Realizări",
            quiz_achievement_unlocked: "Realizare Deblocată!",
            
            // Pagina Resources
            resources_title: "Resurse Educaționale",
            
            // Windows Gallery
            windows_evolution: "Evoluția Windows",
            windows_subtitle: "Explorează istoria sistemului de operare care a schimbat lumea",
            windows_back: "← Înapoi la pagina principală",
            windows_intro_title: "De la Windows 95 la Windows 11",
            windows_intro_desc: "Descoperiți evoluția vizuală și funcțională a celui mai popular sistem de operare pentru desktop.",
            
            // Windows versions
            win95_desc: "Revoluția desktop-ului personal",
            win98_desc: "Internet și multimedia integrate",
            winxp_desc: "Tema Luna și stabilitate",
            winvista_desc: "Design Aero și efecte vizuale",
            win7_desc: "Performanță și eleganță",
            win8_desc: "Interfața Metro modernă",
            win10_desc: "Unificare și actualizări continue",
            win11_desc: "Design fluid și productivitate",
            
            // Știai că
            dyk_title: "Știai că...?",
            
            // Misc
            read_more: "Citește mai mult",
            back_to_top: "Înapoi sus",
            loading: "Se încarcă...",
            error: "A apărut o eroare"
        },
        
        // =====================================================================
        // ENGLISH
        // =====================================================================
        en: {
            // Navigation
            nav_home: "Home",
            nav_about: "About",
            nav_history: "OS History",
            nav_comparison: "Comparison",
            nav_glossary: "Glossary",
            nav_faq: "FAQ",
            nav_quiz: "Quiz",
            nav_resources: "Resources",
            nav_contact: "Contact",
            nav_windows: "Windows",
            
            // Hero Section
            hero_title: "Evolution of Operating Systems – from the first computers to the present",
            hero_subtitle: "This website presents the evolution of operating systems, their role in computer operation, and the differences between the main types of systems used throughout history.",
            hero_btn: "Start the presentation",
            
            // What you'll learn section
            learning_title: "What you'll learn from this site",
            learning_intro: "This educational material covers the main aspects related to operating systems:",
            learning_what_title: "What is an operating system",
            learning_what_desc: "The definition and main components of an operating system, the basic software that controls a computer.",
            learning_role_title: "Role of operating systems",
            learning_role_desc: "Essential functions: memory management, processes, files, and input/output devices.",
            learning_evolution_title: "Evolution over time",
            learning_evolution_desc: "History of operating systems from the 1950s to the present, with the main stages and innovations.",
            learning_diff_title: "Old vs. modern differences",
            learning_diff_desc: "Comparison between past and contemporary operating systems: interfaces, performance, security.",
            learning_examples_title: "Important examples",
            learning_examples_desc: "Presentation of the main operating systems: Windows, macOS, Linux, Android, iOS and others.",
            learning_windows_title: "Windows Evolution",
            learning_windows_desc: "Visually explore all Windows versions from 95 to 11, with interactive simulations of the original interfaces.",
            learning_windows_btn: "View Windows Gallery →",
            
            // Timeline
            timeline_title: "Timeline: Evolution of Operating Systems",
            timeline_1950s_title: "First Operating Systems",
            timeline_1950s_systems: "UNIVAC, IBM System/360 OS",
            timeline_1950s_desc: "The first OSs were developed for mainframe computers. They executed one task at a time.",
            timeline_1970s_title: "Unix and Multiprogramming Era",
            timeline_1970s_systems: "Unix (1969)",
            timeline_1970s_desc: "Unix brought a revolution through portability and modular design. It allowed multiple users to work simultaneously.",
            timeline_1980s_title: "Personal Computers - DOS and Macintosh",
            timeline_1980s_systems: "MS-DOS (1981), Mac OS (1984)",
            timeline_1980s_desc: "Microsoft DOS dominated personal computers. Apple Macintosh introduced the graphical user interface (GUI).",
            timeline_1990s_title: "Windows and Linux",
            timeline_1990s_systems: "Windows 3.0+ (1990), Linux (1991)",
            timeline_1990s_desc: "Windows became dominant in the desktop market. Linux appeared as an open-source alternative to Unix.",
            timeline_2000s_title: "Modern Era",
            timeline_2000s_systems: "Windows XP (2001), macOS X, Android, iOS",
            timeline_2000s_desc: "Operating systems became more stable, secure, and user-friendly. Mobile OS appeared.",
            timeline_2010s_title: "Cloud and Mobile",
            timeline_2010s_systems: "Windows 10, Chrome OS, iOS, Android",
            timeline_2010s_desc: "Cloud integration, virtual assistants, continuous updates. Mobile-first and cross-platform.",
            timeline_2020s_title: "The Future of OS",
            timeline_2020s_systems: "Windows 11, macOS Ventura+, modern Linux",
            timeline_2020s_desc: "Modern interfaces, AI integration, advanced security, ARM support and virtual reality.",
            
            // 3D Timeline Section
            timeline_3d_title: "🗺️ Interactive 3D Timeline",
            timeline_3d_hint: "Drag to navigate • Click for details • Scroll to zoom",
            timeline_btn_back: "⬅️ Back",
            timeline_btn_forward: "Forward ➡️",
            timeline_detailed_title: "A Detailed Chronology",
            
            // 3D Timeline Cards
            card_1950_title: "Mainframe Era",
            card_1950_desc: "First OS for huge computers. Batch processing, punch cards, entire rooms.",
            card_1964_title: "IBM System/360",
            card_1964_desc: "First OS with multiprogramming. Multiple jobs ran simultaneously. A revolution!",
            card_1969_title: "Birth of Unix",
            card_1969_desc: "Bell Labs creates Unix. Modular, portable design. The base for all modern OSs.",
            card_1981_title: "MS-DOS",
            card_1981_desc: "Microsoft DOS on IBM PC. Personal computers enter homes and offices.",
            card_1984_title: "Apple Macintosh",
            card_1984_desc: "First GUI for masses. Click instead of commands. The user interface revolution.",
            card_1985_title: "Windows 1.0",
            card_1985_desc: "Microsoft's first GUI attempt. Modest beginning for what was to dominate.",
            card_1991_title: "Birth of Linux",
            card_1991_desc: "Linus Torvalds creates Linux. Open source, free, powerful. The future of servers.",
            card_1995_title: "Windows 95",
            card_1995_desc: "The turning point. Start button, taskbar. Sold in millions. Dominance begins.",
            card_2001_title: "XP & OS X",
            card_2001_desc: "Stable and popular Windows XP. Mac OS X unites beauty with Unix power.",
            card_2007_title: "Mobile Revolution",
            card_2007_desc: "iPhone launches iOS. Android follows. Billions now have an OS in their pocket.",
            card_2015_title: "Modern Era",
            card_2015_desc: "Windows 10/11, Cloud, IoT, AI. OSs are everywhere. The future is here.",
            
            // Detailed Timeline Items
            detail_1950_title: "🖥️ First Steps - Mainframe Era",
            detail_1950_desc: "The first operating systems were developed for huge mainframe computers. UNIVAC Operating System was one of the first. They executed one task at a time (batch processing). They occupied entire rooms and cost millions of dollars.",
            detail_1964_title: "🎯 IBM System/360 OS",
            detail_1964_desc: "IBM System/360 revolutionized the industry with its operating system that supported multiprogramming. This allowed multiple jobs to run \"simultaneously\" (actually, they alternated quickly). It was a huge leap in efficiency.",
            detail_1969_title: "🔓 Unix - A Revolution",
            detail_1969_desc: "Unix was created at Bell Labs. It brought an innovative approach: \"Do one thing and do it well.\" With its modular and portable design, Unix became the base for many modern OSs. Writing it in C made it easy to port.",
            detail_1981_title: "💻 MS-DOS and Personal Computers",
            detail_1981_desc: "Microsoft DOS launched computers into the office and home. IBM PC with MS-DOS was accessible and easy to use. It marked the beginning of the personal computer era. DOS dominated the market for decades.",
            detail_1984_title: "🎨 Mac OS and GUI",
            detail_1984_desc: "Apple Macintosh introduced the graphical user interface (GUI) to the masses. Users no longer had to type complex commands. They could simply click on icons. This completely changed the way computers were used.",
            detail_1985_title: "🪟 Windows 1.0",
            detail_1985_desc: "Microsoft Windows 1.0 was an attempt to bring GUI to DOS computers. Initially slow and unpopular, Windows evolved and became dominant in the market. A foundation for what was to come.",
            detail_1991_title: "🐧 Birth of Linux",
            detail_1991_desc: "Linus Torvalds created Linux, a kernel inspired by Unix. With the help of the open-source community, Linux grew and became a powerful and free OS. Today it dominates web servers.",
            detail_1995_title: "⭐ Windows 95 - The Turning Point",
            detail_1995_desc: "Windows 95 marked a major change. It was user-friendly, stable, and dominated the market. The Start button, taskbar, and intuitive design became the de facto standard. It sold in millions of copies.",
            detail_2001_title: "🎯 Windows XP and Mac OS X",
            detail_2001_desc: "Windows XP was stable, fast, and easy to use. It dominated the market for years. Apple launched Mac OS X, a combination of Mac beauty and Unix power. Both set new standards.",
            detail_2007_title: "📱 Mobile Revolution",
            detail_2007_desc: "iPhone (iOS) and the first Android phones changed everything. Mobile computing became mainstream. Billions of people now had OSs in their pockets. The cloud computing era began.",
            detail_2015_title: "🚀 Modern Era",
            detail_2015_desc: "Windows 10/11, modern macOS, Linux everywhere (cloud, servers, IoT). Operating systems with AI, advanced security, and virtualization. Hybrid computers and IoT appeared. The future of OSs is here.",
            
            // Contact
            contact_title: "Contact Us",
            contact_name: "Name",
            contact_email: "Email",
            contact_message: "Message",
            contact_send: "Send message",
            
            // Footer
            footer_site: "Evolution of Operating Systems",
            footer_project: "Educational Project - Computer Science Certificate",
            footer_author: "Created by",
            footer_rights: "All rights reserved.",
            
            // Language button
            lang_switch: "🇷🇴 RO",
            lang_tooltip: "Schimbă în Română",
            
            // About page
            about_title: "About Us",
            about_subtitle: "Discover the story behind this site",
            about_mission_title: "🎯 Our Mission",
            about_mission_p1: "SistemOS is an educational platform dedicated to exploring the fascinating evolution of operating systems. Our goal is to make accessible and easy to understand the extraordinary journey of these systems that have changed the way we interact with technology.",
            about_mission_p2: "From the first mainframe computers in the 1950s to today's complex ecosystems, operating systems have played a central role in the digital revolution.",
            about_offer_title: "📚 What We Offer",
            about_education_title: "📖 Education",
            about_education_desc: "Detailed and easy-to-understand information about each stage of OS evolution",
            about_comparison_title: "🔍 Comparisons",
            about_comparison_desc: "Comparative analyses between different current operating systems",
            about_history_title: "📊 Detailed History",
            about_history_desc: "Complete timeline with significant moments and innovations",
            about_community_title: "💬 Community",
            about_community_desc: "Opportunity to contact and share knowledge with other enthusiasts",
            about_why_title: "🌍 Why Do OSs Matter?",
            about_why_p1: "Operating systems are the \"brain\" of every computer. They control all hardware resources and allow programs to function. Without a good OS, computers would be impossible to use.",
            about_why_p2: "The evolution of OSs has been marked by:",
            about_why_list1: "✅ Transition from batch processing to multitasking",
            about_why_list2: "✅ Introduction of graphical user interfaces (GUI)",
            about_why_list3: "✅ Accessibility for ordinary users",
            about_why_list4: "✅ Portability and compatibility",
            about_why_list5: "✅ Security and privacy",
            about_why_list6: "✅ Cloud computing and virtualization",
            about_who_title: "👥 Who Is It For",
            about_who_students: "Students: In computer science, engineering, or any field requiring IT knowledge",
            about_who_professionals: "Professionals: Who want to complete their knowledge about the systems they work on",
            about_who_enthusiasts: "Enthusiasts: Of technology and its history",
            about_who_educators: "Educators: Looking for resources to teach subjects related to OSs",
            
            // History page
            history_title: "Complete OS History",
            history_subtitle: "Explore the complete evolution",
            
            // Comparison page
            comparison_title: "Operating Systems Comparison",
            comparison_subtitle: "Detailed analysis of current operating systems",
            
            // Glossary page
            glossary_title: "📚 Complete Operating Systems Glossary",
            glossary_subtitle: "Over 50 technical terms explained in detail with practical examples",
            glossary_search: "Search term...",
            
            // FAQ page
            faq_title: "❓ Frequently Asked Questions",
            faq_subtitle: "Answers to popular questions",
            
            // Resources page
            resources_title: "Resources and Reading",
            resources_subtitle: "Learn more about operating systems",
            
            // Quiz page
            quiz_title: "🎯 Quiz - Test Your Knowledge",
            quiz_subtitle: "How much do you know about operating systems?",
            quiz_start: "Start Quiz",
            quiz_next: "Next question",
            quiz_finish: "Finish",
            quiz_restart: "Try again",
            quiz_score: "Score",
            quiz_correct: "Correct!",
            quiz_wrong: "Wrong!",
            quiz_achievements: "🏆 Achievements",
            quiz_achievement_unlocked: "Achievement Unlocked!",
            
            // Resources page
            resources_title: "Educational Resources",
            
            // Windows Gallery
            windows_evolution: "Windows Evolution",
            windows_subtitle: "Explore the history of the operating system that changed the world",
            windows_back: "← Back to main page",
            windows_intro_title: "From Windows 95 to Windows 11",
            windows_intro_desc: "Discover the visual and functional evolution of the most popular desktop operating system.",
            
            // Windows versions
            win95_desc: "The personal desktop revolution",
            win98_desc: "Integrated internet and multimedia",
            winxp_desc: "Luna theme and stability",
            winvista_desc: "Aero design and visual effects",
            win7_desc: "Performance and elegance",
            win8_desc: "Modern Metro interface",
            win10_desc: "Unification and continuous updates",
            win11_desc: "Fluid design and productivity",
            
            // Did you know
            dyk_title: "Did you know...?",
            
            // Misc
            read_more: "Read more",
            back_to_top: "Back to top",
            loading: "Loading...",
            error: "An error occurred"
        }
    };

    // =========================================================================
    // CONFIGURARE
    // =========================================================================
    
    const CONFIG = {
        defaultLang: 'ro',           // Limba implicită
        storageKey: 'site_language', // Cheia pentru localStorage
        supportedLangs: ['ro', 'en'] // Limbi suportate
    };

    // Limba curentă
    let currentLang = CONFIG.defaultLang;

    // =========================================================================
    // FUNCȚII PRINCIPALE
    // =========================================================================
    
    /**
     * Obține traducerea pentru o cheie
     * @param {string} key - Cheia traducerii
     * @returns {string} - Textul tradus sau cheia dacă nu există
     */
    function t(key) {
        // Încearcă limba curentă
        if (translations[currentLang] && translations[currentLang][key]) {
            return translations[currentLang][key];
        }
        // Fallback la limba implicită
        if (translations[CONFIG.defaultLang] && translations[CONFIG.defaultLang][key]) {
            return translations[CONFIG.defaultLang][key];
        }
        // Returnează cheia dacă nu există traducere
        console.warn(`[i18n] Traducere lipsă: "${key}"`);
        return key;
    }

    /**
     * Schimbă limba site-ului
     * @param {string} lang - Codul limbii ('ro' sau 'en')
     */
    function setLanguage(lang) {
        // Validare
        if (!CONFIG.supportedLangs.includes(lang)) {
            console.warn(`[i18n] Limba "${lang}" nu este suportată. Se folosește "${CONFIG.defaultLang}".`);
            lang = CONFIG.defaultLang;
        }

        // Setează limba curentă
        currentLang = lang;
        
        // Salvează în localStorage
        localStorage.setItem(CONFIG.storageKey, lang);
        
        // Actualizează atributul lang pe HTML
        document.documentElement.lang = lang;
        
        // Aplică traducerile pe toate elementele
        applyTranslations();
        
        // Actualizează butonul de limbă
        updateLanguageButton();
        
        // Emite eveniment pentru alte componente
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: lang } 
        }));
        
        console.log(`[i18n] Limba schimbată la: ${lang}`);
    }

    /**
     * Schimbă între limbi (toggle RO <-> EN)
     */
    function toggleLanguage() {
        const newLang = currentLang === 'ro' ? 'en' : 'ro';
        setLanguage(newLang);
    }

    /**
     * Returnează limba curentă
     * @returns {string} - Codul limbii curente
     */
    function getCurrentLang() {
        return currentLang;
    }

    // =========================================================================
    // APLICARE TRADUCERI ÎN DOM
    // =========================================================================
    
    /**
     * Lista de funcții callback pentru re-renderizare la schimbarea limbii
     * Componentele care generează conținut dinamic se pot înregistra aici
     */
    const renderCallbacks = [];
    
    /**
     * Înregistrează o funcție de callback pentru re-renderizare
     * @param {Function} callback - Funcția care va fi apelată la schimbarea limbii
     */
    function onLanguageChange(callback) {
        if (typeof callback === 'function' && !renderCallbacks.includes(callback)) {
            renderCallbacks.push(callback);
        }
    }
    
    /**
     * Dezînregistrează un callback
     * @param {Function} callback - Funcția de dezînregistrat
     */
    function offLanguageChange(callback) {
        const index = renderCallbacks.indexOf(callback);
        if (index > -1) {
            renderCallbacks.splice(index, 1);
        }
    }
    
    /**
     * Apelează toate callback-urile de re-renderizare
     */
    function triggerRenderCallbacks() {
        renderCallbacks.forEach(callback => {
            try {
                callback(currentLang);
            } catch (e) {
                console.warn('[i18n] Eroare în callback de re-renderizare:', e);
            }
        });
    }
    
    /**
     * Aplică traducerile pe toate elementele marcate
     * Caută elemente cu data-i18n sau data-translate
     */
    function applyTranslations() {
        // Selectează toate elementele cu data-i18n sau data-translate
        const elements = document.querySelectorAll('[data-i18n], [data-translate]');
        
        elements.forEach(el => {
            // Obține cheia (suportă ambele atribute)
            const key = el.getAttribute('data-i18n') || el.getAttribute('data-translate');
            if (!key) return;
            
            const translation = t(key);
            if (!translation || translation === key) return;
            
            // Aplică traducerea în funcție de tipul elementului
            const tagName = el.tagName.toLowerCase();
            
            if (tagName === 'input' || tagName === 'textarea') {
                // Pentru input-uri, actualizează placeholder
                if (el.hasAttribute('placeholder')) {
                    el.placeholder = translation;
                }
                // Pentru input-uri cu value (butoane)
                if (el.type === 'submit' || el.type === 'button') {
                    el.value = translation;
                }
            } else if (tagName === 'img') {
                // Pentru imagini, actualizează alt
                el.alt = translation;
            } else if (el.hasAttribute('title')) {
                // Pentru elemente cu title
                el.title = translation;
            } else {
                // Pentru alte elemente, actualizează textContent
                el.textContent = translation;
            }
        });

        // Actualizează titlul paginii
        updatePageTitle();
        
        // Trigger re-renderizare pentru componentele dinamice
        triggerRenderCallbacks();
    }

    /**
     * Actualizează titlul paginii
     */
    function updatePageTitle() {
        const path = window.location.pathname.toLowerCase();
        let titleKey = 'footer_site';

        if (path.includes('about')) titleKey = 'about_title';
        else if (path.includes('history')) titleKey = 'history_title';
        else if (path.includes('comparison')) titleKey = 'comparison_title';
        else if (path.includes('glossary')) titleKey = 'glossary_title';
        else if (path.includes('faq')) titleKey = 'faq_title';
        else if (path.includes('resources')) titleKey = 'resources_title';
        else if (path.includes('quiz')) titleKey = 'quiz_title';
        else if (path.includes('windows')) titleKey = 'windows_evolution';

        const title = t(titleKey);
        if (title && title !== titleKey) {
            document.title = title + ' - SistemOS';
        }
    }

    /**
     * Actualizează butonul de schimbare a limbii
     */
    function updateLanguageButton() {
        const langBtn = document.getElementById('langToggle');
        if (!langBtn) return;

        const switchText = t('lang_switch');
        const tooltip = t('lang_tooltip');

        if (switchText) langBtn.textContent = switchText;
        if (tooltip) langBtn.title = tooltip;
    }

    // =========================================================================
    // INIȚIALIZARE
    // =========================================================================
    
    /**
     * Inițializează sistemul de traduceri
     */
    function init() {
        // Verifică limba salvată în localStorage
        let savedLang = localStorage.getItem(CONFIG.storageKey);
        
        // Dacă nu există, folosește limba implicită
        if (!savedLang || !CONFIG.supportedLangs.includes(savedLang)) {
            savedLang = CONFIG.defaultLang;
        }

        // Setează limba (fără a salva din nou în localStorage)
        currentLang = savedLang;
        document.documentElement.lang = savedLang;
        
        // Aplică traducerile
        applyTranslations();
        
        // Actualizează butonul
        updateLanguageButton();
        
        console.log(`[i18n] Inițializat cu limba: ${currentLang}`);
    }

    // =========================================================================
    // EXPORT GLOBAL
    // =========================================================================
    
    // Obiect API public
    const i18n = {
        t: t,
        setLanguage: setLanguage,
        toggle: toggleLanguage,
        toggleLanguage: toggleLanguage,
        getCurrentLang: getCurrentLang,
        applyTranslations: applyTranslations,
        getSupportedLangs: () => [...CONFIG.supportedLangs],
        // Funcții pentru re-renderizare la schimbarea limbii
        onLanguageChange: onLanguageChange,
        offLanguageChange: offLanguageChange,
        // Traduceri brute pentru acces direct
        getTranslations: () => translations[currentLang],
        getAllTranslations: () => translations
    };

    // Export la window pentru acces global
    window.i18n = i18n;
    window.t = t;
    window.toggleLanguage = toggleLanguage;
    window.setLanguage = setLanguage;
    window.getCurrentLang = getCurrentLang;
    window.onLanguageChange = onLanguageChange;

    // =========================================================================
    // AUTO-INIȚIALIZARE
    // =========================================================================
    
    // Inițializare când DOM-ul este gata
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM-ul este deja încărcat
        init();
    }

})();
