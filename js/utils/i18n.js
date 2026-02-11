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
            history_intro_title: "Istoria Sistemelor de Operare",
            history_intro_subtitle: "De la cartele perforate la cloud și inteligență artificială",
            history_chapters_title: "Capitolele Istoriei Sistemelor de Operare",
            history_chapters_hint: "Apasă pe un capitol pentru a explora detaliat fiecare perioadă din istoria sistemelor de operare!",
            history_ch1_index: "Capitolul 1:",
            history_ch1_title: "Începuturile sistemelor de operare",
            history_ch1_desc: "Primele calculatoare, primele interfețe, GM-NAA I/O",
            history_ch2_index: "Capitolul 2:",
            history_ch2_title: "Era Mainframe",
            history_ch2_desc: "Batch processing, carduri perforate, multiprogramare",
            history_ch3_index: "Capitolul 3:",
            history_ch3_title: "Nașterea Unix",
            history_ch3_desc: "Bell Labs, portabilitate, influența asupra SO moderne",
            history_ch4_index: "Capitolul 4:",
            history_ch4_title: "Era PC și GUI",
            history_ch4_desc: "MS-DOS, Macintosh, Windows, interfața grafică",
            history_ch5_index: "Capitolul 5:",
            history_ch5_title: "Linux și Open Source",
            history_ch5_desc: "Linus Torvalds, mișcarea open source, servere",
            history_ch6_index: "Capitolul 6:",
            history_ch6_title: "Era Modernă",
            history_ch6_desc: "Windows, macOS, Linux, mobil, cloud, AI",
            
            // Pagina Comparison
            comparison_title: "Comparare Sisteme de Operare",
            comparison_subtitle: "Analiza detaliată a diferitelor SO actuale",
            comparison_market_title: "📊 Cota de Piață Interactivă",
            comparison_desktop_title: "💻 Cota de Piață Desktop OS",
            comparison_mobile_title: "📱 Cota de Piață Mobile OS",
            comparison_server_title: "🖥️ Cota de Piață Server OS",
            comparison_other: "Altele",
            
            // Pagina Glossary
            glossary_title: "📚 Glosar Complet al Sistemelor de Operare",
            glossary_subtitle: "Peste 50 de termeni tehnici explicați detaliat cu exemple practice",
            glossary_search: "Caută termen...",
            // Glossary categories (RO)
            gl_category_kernel: "Kernel și Componente Core",
            gl_category_kernel_sub: "Nucleul sistemului de operare și componentele fundamentale",
            gl_category_process: "Procese și Thread-uri",
            gl_category_process_sub: "Execuția programelor și managementul sarcinilor",
            gl_category_memory: "Gestionarea Memoriei",
            gl_category_memory_sub: "RAM, memorie virtuală și tehnici de alocare",
            gl_category_filesystem: "Sisteme de Fișiere",
            gl_category_filesystem_sub: "Organizarea și stocarea datelor pe disc",
            gl_category_security: "Securitate și Permisiuni",
            gl_category_security_sub: "Protecția sistemului și controlul accesului",
            gl_category_interface: "Interfețe Utilizator",
            gl_category_interface_sub: "GUI, CLI și moduri de interacțiune",
            gl_category_io: "I/O și Întreruperi",
            gl_category_io_sub: "Comunicarea cu dispozitivele și gestionarea evenimentelor",
            gl_category_api: "API și Programare",
            gl_category_api_sub: "Interfețe de programare și dezvoltare",
            // Glossary terms (RO) - main entries
            gl_kernel_title: "Kernel (Nucleu)",
            gl_kernel_desc: "Componenta centrala și cea mai importanta a unui sistem de operare. Kernel-ul acționează ca un pod între aplicații și hardware, gestionând resursele sistemului și oferind servicii esențiale tuturor programelor.",
            gl_syscall_title: "System Call (Apel de sistem)",
            gl_syscall_desc: "Mecanismul prin care un program din user space solicita un serviciu de la kernel. System calls sunt poarta de acces controlata catre resursele hardware și funcțiile privilegiate ale SO.",
            gl_driver_title: "Driver (Șofer de dispozitiv)",
            gl_driver_desc: "Software specializat care permite sistemului de operare sa comunice cu un dispozitiv hardware specific. Driverele traduc comenzile generice ale SO în instrucțiuni specifice dispozitivului.",
            gl_bootloader_title: "Bootloader",
            gl_bootloader_desc: "Primul program care ruleaza la pornirea calculatorului. Bootloader-ul inițializeaza hardware-ul, încarca kernelul în memorie și îi transfera controlul.",
            gl_bios_title: "BIOS (Basic Input/Output System)",
            gl_bios_desc: "Firmware tradițional stocat pe un chip de pe placa de baza, care inițializeaza hardware-ul și pornește procesul de boot. A fost înlocuit treptat de UEFI.",
            gl_uefi_title: "UEFI (Unified Extensible Firmware Interface)",
            gl_uefi_desc: "Succesorul modern al BIOS-ului, oferind o interfață grafica, boot mai rapid, suport pentru discuri mari și caracteristici de securitate precum Secure Boot.",
            gl_process_title: "Proces",
            gl_process_desc: "O instanță a unui program în execuție. Fiecare proces are propriul spațiu de adrese, resurse alocate și cel puțin un thread de execuție. Procesele sunt izolate între ele pentru securitate și stabilitate.",
            gl_thread_title: "Thread (Fir de execuție)",
            gl_thread_desc: "Cea mai mica unitate de execuție care poate fi planificata de SO. Thread-urile din același proces împart același spațiu de adrese și resurse, dar au propria stivă și registre.",
            gl_scheduler_title: "Scheduler (Planificator)",
            gl_scheduler_desc: "Componenta kernel-ului care decide care proces/thread primește timp de CPU și pentru cât timp. Obiectivul este maximizarea utilizarii CPU și minimizarea timpului de așteptare.",
            gl_deadlock_title: "Deadlock (Blocare reciprocă)",
            gl_deadlock_desc: "Situație în care două sau mai multe procese se blocheaza permanent, fiecare așteptând resurse deținute de celelalte. Niciun proces nu poate continua.",
            gl_ram_title: "RAM (Random Access Memory)",
            gl_ram_desc: "Memoria volatila principala a calculatorului, unde sunt încărcate programele și datele în timpul execuției. Accesul este rapid dar conținutul se pierde la oprirea alimentarii.",
            gl_vmem_title: "Virtual Memory (Memorie Virtuala)",
            gl_vmem_desc: "Tehnica de gestionare a memoriei care creeaza iluzia unei memorii RAM mult mai mari decât cea fizica disponibila, folosind spatiu pe disc ca extensie.",
            gl_cache_title: "Cache (Memorie Cache)",
            gl_cache_desc: "Memorie extrem de rapida situata intre CPU și RAM, care stocheaza copii ale datelor frecvent accesate pentru a reduce latenta accesului la memorie.",
            // Additional glossary UI headings (RO) - used inside glossary page
            gl_term_functions: "🔧 Funcții principale:",
            gl_kernel_types: "🧩 Tipuri de kernel:",
            gl_how_it_works: "⚙️ Cum funcționează:",
            gl_driver_types: "🔌 Tipuri de drivere:",
            gl_boot_process: "🚀 Procesul de boot:",
            gl_bios_limits: "❗ Limitări BIOS:",
            gl_uefi_advantages: "🔒 Avantaje UEFI:",
            gl_ram_types: "🧠 Tipuri de RAM:",
            gl_cache_levels: "📦 Niveluri de cache:",
            gl_filesystem_popular: "🗂️ Sisteme de fișiere populare:",
            gl_inode_contains: "📌 Ce conține un inode:",
            gl_partition_schemes: "📑 Scheme de partiționare:",
            gl_unix_permissions: "🔐 Sistemul Unix (chmod):",
            gl_mutex_ops: "⚙️ Operații:",
            gl_gui_components: "🧩 Componente GUI:",
            gl_shells_popular: "🐚 Shell-uri populare:",
            gl_shell_features: "⚙️ Funcționalități shell:",
            gl_interrupt_types: "🔔 Tipuri de întreruperi:",
            gl_io_methods: "🔌 Metode I/O:",
            gl_api_types: "🔗 Tipuri de API:",
            gl_posix_standardizes: "📜 Ce standardizează POSIX:",
            gl_filesystem_title: "Sistem de Fișiere (File System)",
            gl_filesystem_desc: "Metoda și structura de date folosita pentru a organiza, stoca, gasi și accesa fișierele pe un dispozitiv de stocare.",
            gl_inode_title: "Inode",
            gl_inode_desc: "Structura de date în sistemele de fișiere Unix/Linux care stocheaza metadatele unui fișier (permisiuni, proprietar, timestamps, locatie pe disc) - totul în afara de nume.",
            gl_partition_title: "Partiție",
            gl_partition_desc: "Secțiune logica a unui disc care poate fi formatata cu un sistem de fișiere propriu. Permite organizarea și izolarea datelor.",
            gl_permissions_title: "Permisiuni",
            gl_permissions_desc: "Reguli care definesc ce operații pot fi efectuate asupra unui fișier sau resursa și de către cine. Fundamentale pentru securitatea sistemului.",
            gl_mutex_title: "Mutex (Mutual Exclusion)",
            gl_mutex_desc: "Obiect de sincronizare care permite doar unui singur thread sa acceseze o resursa partajata la un moment dat, prevenind race conditions.",
            gl_race_title: "Race Condition",
            gl_race_desc: "Situație în care comportamentul programului depinde de ordinea relativa sau timing-ul evenimentelor necontrolate, ducand la rezultate imprevizibile.",
            gl_gui_title: "GUI (Graphical User Interface)",
            gl_gui_desc: "Interfața grafica ce permite utilizatorilor sa interactioneze cu sistemul prin elemente vizuale precum ferestre, butoane, meniuri și iconițe.",
            gl_cli_title: "CLI (Command Line Interface)",
            gl_cli_desc: "Interfața text unde utilizatorul introduce comenzi pentru a interactiona cu sistemul. Ofera control precis și posibilitatea de automatizare prin scripturi.",
            gl_shell_title: "Shell",
            gl_shell_desc: "Program care interpreteaza comenzile utilizatorului și le transmite kernel-ului pentru execuție. Poate fi grafic sau text.",
            gl_interrupt_title: "Interrupt (Întrerupere)",
            gl_interrupt_desc: "Semnal hardware sau software care intrerupe executia normala a CPU-ului pentru a trata un eveniment urgent (ex: apasare tasta, date de la retea).",
            gl_io_title: "I/O (Input/Output)",
            gl_io_desc: "Comunicarea intre sistem si dispozitivele externe. Input = date primite, Output = date trimise.",
            gl_api_title: "API (Application Programming Interface)",
            gl_api_desc: "Set de functii, protocoale si unelte care permit aplicatiilor sa comunice intre ele sau cu sistemul de operare intr-un mod standardizat.",
            gl_posix_title: "POSIX",
            gl_posix_desc: "Portable Operating System Interface - familie de standarde care definesc API-ul pentru compatibilitate intre sisteme Unix-like.",
            // Additional small term titles used as related-tags
            gl_privileges_title: "Privilegii",
            gl_rom_title: "ROM",
            gl_secure_boot_title: "Secure Boot",
            gl_context_switching_title: "Context Switching",
            gl_semaphore_title: "Semafor",
            gl_page_fault_title: "Page Fault",
            gl_mmu_title: "MMU",
            gl_cpu_title: "CPU",
            gl_mount_title: "Mount",
            gl_hardlink_title: "Hard Link",
            gl_root_title: "Root",
            gl_terminal_title: "Terminal",
            gl_dma_title: "DMA",
            gl_unix_title: "Unix",
            
            // Pagina FAQ
            faq_title: "❓ Întrebări Frecvente",
            faq_subtitle: "Răspunsuri la întrebările populare",

            // FAQ - întrebări și răspunsuri (RO)
            faq_q1: "Care este diferența dintre kernel și SO?",
            faq_a1: "Kernelul este nucleul SO-ului, componenta principală care gestionează resursele. Sistemul de operare include kernelul plus alte componente: driveri, utilitare, aplicații, interfață grafică, etc.",
            faq_q2: "De ce Windows este cel mai popular SO?",
            faq_a2: "Windows domină piața datorită combinației dintre compatibilitate hardware, familiaritate utilizatorilor și suportul pentru o gamă vastă de software și jocuri.",
            faq_q3: "Linux este cu adevărat gratuit?",
            faq_a3: "Da — kernelul Linux este open-source și gratuit; unele distribuții oferă suport comercial, dar majoritatea instrumentelor rămân gratuite.",
            faq_q4: "Ce este multitasking-ul?",
            faq_a4: "Multitasking-ul permite rularea mai multor programe aparent simultan prin alternarea rapidă a execuției între procese.",
            faq_q5: "Care SO este cel mai sigur?",
            faq_a5: "Depinde de scenariu: iOS/macOS sunt foarte securizate pentru utilizatorii obișnuiți; Linux e preferat pe servere; Windows necesită atenție sporită la securitate.",
            faq_q6: "Pot rula Windows pe Mac?",
            faq_a6: "Pe Mac-urile Intel poți folosi virtualizare (Parallels/VMware). Pe Apple Silicon (M1/M2) suportul nativ pentru Windows e limitat.",
            faq_q7: "De ce Android domină piața mobile?",
            faq_a7: "Android e flexibil, open-source și adoptat de mulți producători; iOS rulează exclusiv pe iPhone, ceea ce limitează acoperirea.",
            faq_q8: "Ce este cloud computing?",
            faq_a8: "Cloud computing înseamnă furnizarea de resurse IT (servere, stocare, aplicații) prin internet în loc de resurse locale.",
            faq_q9: "Care este viitorul sistemelor de operare?",
            faq_a9: "Viitorul include integrare AI, sisteme hibride cloud-local, securitate avansată și interfețe naturale (voice/gesture).",
            faq_q10: "Pot face propriul meu SO?",
            faq_a10: "Da, dar e un proiect complex; un kernel minimal sau bootloader sunt țeluri realiste pentru un proiect educațional.",

            // Resources (RO) - secțiuni și elemente
            resources_books_title: "📚 Cărți Recomandate",
            resources_book1_title: "Operating Systems: Three Easy Pieces",
            resources_book1_desc: "Una dintre cele mai bune cărți pentru înțelegerea conceptelor SO. Disponibilă gratuit online.",
            resources_book2_title: "Modern Operating Systems",
            resources_book2_desc: "O carte clasică și comprehensivă despre SO-uri, cu exemple din lumea reală.",
            resources_book3_title: "The Linux Programming Interface",
            resources_book3_desc: "Profund și detaliat, pentru cei care doresc să înțeleagă Linux la nivel de programare.",
            resources_courses_title: "🎓 Cursuri Online",
            resources_course1_title: "MIT OpenCourseWare",
            resources_course1_sub: "6.828 Operating System Engineering",
            resources_course1_desc: "Cursul MIT gratuit, oferit de una din cele mai bune universități din lume.",
            resources_course2_title: "Coursera",
            resources_course2_sub: "Operating Systems Design and Implementation",
            resources_course2_desc: "Cursuri interactive cu certificare opțională.",
            resources_course3_title: "Udacity",
            resources_course3_sub: "Operating Systems Nanodegree",
            resources_course3_desc: "Program intensiv pentru dezvoltatori care doresc să se specialize în SO.",
            resources_sites_title: "🌐 Site-uri Informative",
            resources_site1_title: "The Linux Foundation",
            resources_site1_desc: "Organizația care suportă Linux. Informații, programe de training, și comunitate.",
            resources_site2_title: "Wikipedia - Operating Systems",
            resources_site2_desc: "Informații detaliate și referințe către sute de SO-uri, istorii și comparații.",
            resources_site3_title: "OS.js",
            resources_site3_desc: "Vizualizare interactivă a cum funcționează sistemele de operare moderne.",
            resources_docs_title: "💻 Documentație Oficială",
            resources_doc1_title: "Microsoft Learn",
            resources_doc1_sub: "Windows Operating System",
            resources_doc1_desc: "Resurse oficiale de la Microsoft pentru înțelegerea Windows.",
            resources_doc2_title: "Apple Developer Documentation",
            resources_doc2_sub: "macOS",
            resources_doc2_desc: "Documentație completă pentru dezvoltatorii care lucreaza cu macOS.",
            resources_doc3_title: "Linux Man Pages",
            resources_doc3_desc: "Documentația completă pentru fiecare comandă și funcție Linux.",
            resources_videos_title: "🎬 Video Educative",
            resources_video1_title: "YouTube - Crash Course Computer Science",
            resources_video1_desc: "Seri de videoclipuri educative care explică conceptele SO într-un mod ușor de înțeles.",
            resources_video2_title: "YouTube - TechTalk Channels",
            resources_video2_desc: "Preleceri și discuții despre evoluția și design-ul SO-urilor.",
            resources_tools_title: "📦 Instrumentele și Software",
            resources_tool1_title: "VirtualBox",
            resources_tool1_desc: "Software gratuit pentru a rula mai mulți SO-uri pe același calculator. Perfect pentru a experimenta.",
            resources_tool2_title: "QEMU",
            resources_tool2_desc: "Emulator puternic pentru a testa diferite SO-uri și arhitecturi.",
            resources_tool3_title: "GDB (GNU Debugger)",
            resources_tool3_desc: "Instrument pentru debugging la nivel low, util pentru înțelegerea SO-urilor.",

            // Comparison (RO) - headers and shared labels
            comparison_th_feature: "Caracteristică",
            comparison_th_windows: "Windows",
            comparison_th_macos: "macOS",
            comparison_th_linux: "Linux",
            comparison_th_ios: "iOS",
            comparison_th_android: "Android",
            comparison_feature_cost: "Cost",
            comparison_feature_open: "Open Source",
            comparison_feature_usability: "Ușor de Folosit",
            comparison_feature_security: "Securitate",
            comparison_feature_gaming: "Potență pentru Gaming",
            comparison_feature_professional: "Professional/Workstations",
            comparison_feature_servers: "Servere",
            comparison_feature_iot: "IoT & Embedded",
            comparison_feature_portability: "Portabilitate",
            comparison_feature_market: "Market Share (Desktop)",
            comparison_feature_community: "Comunitate",
            comp_paid: "Plătit",
            comp_free: "Gratuit",
            comp_yes: "Da",
            comp_no: "Nu",
            comp_partial: "Variabil",
            comp_good: "Bună",
            comp_excellent: "Excelentă",
            comp_rare: "Rară",
            comp_dominate: "Domină",
            comp_popular: "Popular",
            comp_windows_only: "Doar Windows",
            comp_apple_only: "Doar Apple",
            comp_portable: "Portabil",
            comp_multidevice: "Multi-dispozitiv",
            comp_dash: "-",
            comp_very_large: "Foarte mare",

            // Glossary (RO) - stats and filters
            glossary_stat_terms: "Termeni",
            glossary_stat_categories: "Categorii",
            glossary_stat_examples: "Exemple Cod",
            glossary_stat_interactive: "Interactiv",
            glossary_filter_all: "Toate",
            glossary_filter_basic: "De bază",
            glossary_filter_advanced: "Avansat",
            glossary_filter_kernel: "Kernel",
            glossary_filter_memory: "Memorie",
            glossary_filter_process: "Procese",
            glossary_filter_filesystem: "Fișiere",
            glossary_filter_security: "Securitate",
            
            // Pagina Resources
            resources_title: "Resurse și Lecturi",
            resources_subtitle: "Află mai mult despre sistemele de operare",
            
            // Pagina Quiz
            quiz_title: "🎯 Quiz - Testează-ți Cunoștințele",
            quiz_subtitle: "Cât de mult știi despre sistemele de operare?",
            quiz_start: "Începe Quiz-ul",
            quiz_next: "Următoarea întrebare",
            quiz_finish: "Finalizează",
            quiz_restart: "Reia Quiz-ul",
            quiz_leaderboard: "🏅 Top 10 Jucători",
            quiz_add_current: "Adaugă rezultatul curent",
            quiz_start_title: "Gata să-ți testezi cunoștințele?",
            quiz_start_sub: "Apasă mai jos pentru a începe quiz-ul. Mult succes!",
            quiz_results: "Rezultatele Tale",
            quiz_score: "Scor",
            quiz_correct: "Corect!",
            quiz_wrong: "Greșit!",
            quiz_achievements: "🏆 Realizări",
            quiz_achievement_unlocked: "Realizare Deblocată!",
            quiz_question: "Întrebarea",
            quiz_question_image_alt: "Imagine întrebare",
            quiz_select_answer: "Te rog selectează un răspuns!",
            quiz_time_bonus: "Bonus timp",
            quiz_total: "Total",
            quiz_points: "puncte",
            quiz_msg_perfect: "🏆 Perfect! Ești expert în sistemele de operare!",
            quiz_msg_excellent: "🎉 Excelent! Cunoști foarte bine SO-urile!",
            quiz_msg_good: "👍 Bun! Cunoști conceptele principale.",
            quiz_msg_study: "📚 Trebuie să studiezi mai mult!",
            quiz_msg_retry: "💪 Revino și reîncearcă după ce studiezi!",
            quiz_leaderboard_prompt: "Introduceți-vă nume pentru leaderboard:",
            quiz_share_result: "📤 Distribuie rezultatul",
            quiz_share_text: "Am obținut {score} puncte ({percent}%) la quiz-ul Evoluția Sistemelor de Operare! 🎯⚡",
            quiz_achievements_label: "Realizări",
            quiz_leaderboard_label: "Clasament",
            quiz_bonus: "bonus",
            
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
            
            // OS cards (homepage)
            os_windows_title: "Windows",
            os_windows_desc: "Cel mai utilizat SO pe desktop-uri. Dezvoltat de Microsoft.",
            os_macos_title: "macOS",
            os_macos_desc: "Sistemul de operare al calculatoarelor Apple, cunoscut pentru stabilitate și design.",
            os_linux_title: "Linux",
            os_linux_desc: "Sistem open-source folosit pe scară largă pe servere și desktop-uri.",
            os_android_title: "Android",
            os_android_desc: "Sistem de operare mobil dezvoltat de Google, foarte răspândit.",
            os_ios_title: "iOS",
            os_ios_desc: "Sistemul de operare pentru iPhone și iPad, cunoscut pentru securitate și integrare.",
            os_chrome_title: "ChromeOS",
            os_chrome_desc: "Sistem de operare pentru Chromebook-uri, optimizat pentru aplicații web și cloud.",
            
            // Știai că
            dyk_title: "Știai că...?",
            
            // Misc
            read_more: "Citește mai mult",
            back_to_top: "Înapoi sus",
            loading: "Se încarcă...",
            error: "A apărut o eroare",
            
            // =====================================================================
            // CAPITOLUL 1: Începuturile Sistemelor de Operare
            // =====================================================================
            ch1_title: "Capitolul 1: Începuturile Sistemelor de Operare",
            ch1_subtitle: "Capitolul 1: Începuturile Sistemelor de Operare",
            ch1_lead: "O călătorie fascinantă în zorii erei digitale — când ideile revoluționare au luat forma primelor calculatoare",
            ch1_back: "← Înapoi la Istorie",
            
            // Intro
            ch1_intro: "Imaginează-ți o cameră cât o sală de sport, plină de cabluri, becuri și comutatoare. Aceasta era realitatea anilor <span class=\"highlight\">1940–1950</span>, când umanitatea a construit primele <strong>calculatoare electronice</strong>. Nu existau tastaturi, monitoare sau sisteme de operare — doar mașini gigantice care trebuiau programate manual, fir cu fir, cartelă cu cartelă.",
            
            // Section 1
            ch1_s1_title: "Context Istoric Extins",
            ch1_s1_p1: "Al Doilea Război Mondial a accelerat dramatic dezvoltarea tehnologiei de calcul. Nevoia de a <strong>decripta coduri</strong> și de a calcula traiectorii balistice a condus la crearea primelor mașini electronice de calcul.",
            ch1_s1_quote: "Calculatoarele din această eră nu erau \"inteligente\" — erau doar foarte rapide la a face exact ce li se spunea, pas cu pas.",
            ch1_s1_quote_cite: "— Principiu fundamental al calculului timpuriu",
            ch1_s1_p2: "Mașinile precum <span class=\"key-term\">ENIAC</span> (Electronic Numerical Integrator and Computer) și <span class=\"key-term\">UNIVAC</span> (Universal Automatic Computer) ocupau încăperi întregi și consumau energie cât o fabrică mică. Programarea se făcea prin:",
            ch1_s1_li1: "<strong>Reconfigurarea cablurilor</strong> — operatorii conectau fizic circuitele pentru fiecare program nou",
            ch1_s1_li2: "<strong>Carduri perforate</strong> — date și instrucțiuni reprezentate prin găuri în cartoane speciale",
            ch1_s1_li3: "<strong>Panouri de control</strong> — comutatoare și butoane pentru setarea parametrilor",
            ch1_s1_li4: "<strong>Intervenție manuală constantă</strong> — fiecare pas necesita supraveghere umană directă",
            
            // Section 2
            ch1_s2_title: "De Ce a Contat Această Eră?",
            ch1_s2_p1: "Deși primitive după standardele actuale, aceste mașini au pus bazele întregii industrii IT moderne. Provocările întâmpinate de pionierii calculului au condus la inovații fundamentale:",
            ch1_s2_card1_title: "Automatizare",
            ch1_s2_card1_desc: "Nevoia de a reduce intervenția umană a condus la primele sisteme de control automat",
            ch1_s2_card2_title: "Gestiune Hardware",
            ch1_s2_card2_desc: "Eficiența limitată a dus la dezvoltarea metodelor de management al resurselor",
            ch1_s2_card3_title: "Sisteme de Control",
            ch1_s2_card3_desc: "Primii precursori ai sistemelor de operare moderne au apărut din necesitate",
            
            // Section 3
            ch1_s3_title: "Concepte-Cheie ale Epocii",
            ch1_s3_p1: "Pentru a înțelege cum funcționau primele calculatoare, trebuie să cunoaștem câteva concepte fundamentale care defineau această perioadă:",
            ch1_s3_c1_title: "Carduri Perforate",
            ch1_s3_c1_desc: "Cartoane cu găuri poziționate strategic, reprezentând date și instrucțiuni. Fiecare gaură (sau lipsa ei) era un bit de informație.",
            ch1_s3_c2_title: "Procesare Batch",
            ch1_s3_c2_desc: "Programele (job-uri) erau grupate și executate secvențial, unul după altul, fără intervenție în timp real.",
            ch1_s3_c3_title: "Lipsă Multitasking",
            ch1_s3_c3_desc: "Un singur program rula la un moment dat. Calculatorul era complet dedicat acelui task până la finalizare.",
            ch1_s3_c4_title: "GM-NAA I/O",
            ch1_s3_c4_desc: "Primul \"sistem de operare\" (1956), dezvoltat pentru IBM 704. Automatiza încărcarea și execuția job-urilor batch.",
            
            // Section 4
            ch1_s4_title: "Exemple și Tehnologii Reprezentative",
            ch1_s4_p1: "Să explorăm cele mai importante mașini care au marcat această eră fondatoare:",
            ch1_s4_t1_year: "1945",
            ch1_s4_t1_title: "ENIAC — Electronic Numerical Integrator and Computer",
            ch1_s4_t1_desc: "Primul calculator electronic de uz general. Cântărea 27 de tone, ocupa 167 m² și consuma 150 kW. Putea efectua 5.000 de adunări pe secundă — revoluționar pentru acea vreme. Programarea dura zile întregi și implica reconectarea a mii de cabluri.",
            ch1_s4_t2_year: "1951",
            ch1_s4_t2_title: "UNIVAC I — Universal Automatic Computer",
            ch1_s4_t2_desc: "Primul calculator comercial produs în serie. A prezis corect rezultatul alegerilor prezidențiale din SUA în 1952, demonstrând potențialul calculatoarelor în analiza datelor. Folosea bandă magnetică pentru stocare, nu doar carduri perforate.",
            ch1_s4_t3_year: "1956",
            ch1_s4_t3_title: "IBM 704 cu GM-NAA I/O",
            ch1_s4_t3_desc: "Primul calculator cu un sistem rudimentar de operare. GM-NAA I/O (dezvoltat de General Motors și North American Aviation) automatiza tranziția între job-uri, reducând timpul pierdut între execuții. Acesta este considerat strămoșul tuturor sistemelor de operare moderne.",
            
            // Section 5
            ch1_s5_title: "Impact și Moștenire",
            ch1_s5_p1: "Lecțiile învățate în această eră primitivă au modelat întreaga evoluție ulterioară a informaticii. Iată principalele contribuții care persistă și astăzi:",
            ch1_s5_li1: "<strong>Conceptul de Job Scheduling</strong> — Ideea de a organiza și prioritiza sarcinile este fundamentală în orice sistem de operare modern, de la Windows la Android.",
            ch1_s5_li2: "<strong>Abstracția Hardware-ului</strong> — Primii pași spre separarea software-ului de hardware, permițând programatorilor să scrie cod fără a cunoaște detaliile fizice ale mașinii.",
            ch1_s5_li3: "<strong>Procesare Automată</strong> — Tranziția de la operare manuală la automatizare a deschis calea către multitasking și sistemele în timp real.",
            ch1_s5_li4: "<strong>Standardizare</strong> — Nevoia de compatibilitate a condus la primele standarde și protocoale în industria calculatoarelor.",
            ch1_s5_quote: "Fiecare smartphone din buzunarul nostru este mai puternic decât toate calculatoarele din anii '50 combinate — iar aceasta este moștenirea pionierilor acelei ere.",
            
            // Section 6 - Media
            ch1_s6_title: "Experiență Interactivă și Media",
            ch1_s6_p1: "Explorează vizual această eră fascinantă prin imagini autentice, documentare video și atmosferă sonoră. Aceste resurse te vor ajuta să înțelegi mai bine contextul și dimensiunea realizărilor din acea perioadă.",
            ch1_s6_gallery: "📷 Galerie Foto Istorică",
            ch1_s6_img1_title: "ENIAC (1945)",
            ch1_s6_img1_desc: "Primul calculator electronic de uz general. Observă dimensiunea enormă și complexitatea cablajului. Operatorii din imagine reconfigurează circuitele pentru un nou program.",
            ch1_s6_img2_title: "Card Perforat Hollerith",
            ch1_s6_img2_desc: "Principalul mediu de stocare a datelor. Fiecare gaură reprezenta un bit de informație. Un program complex necesita mii de astfel de carduri, în ordine precisă.",
            ch1_s6_img3_title: "IBM 704 (1959)",
            ch1_s6_img3_desc: "Calculatorul pe care a rulat GM-NAA I/O, primul sistem de operare. Remarcă panoul de control și operatorul care supraveghează procesul.",
            ch1_s6_video: "🎬 Documentar Video Educativ",
            ch1_s6_video_title: "De ce acest video?",
            ch1_s6_video_desc: "\"Computerland: The Visionaries\" (1992) — un documentar care include segmente cu J. Presper Eckert, co-creator al ENIAC și UNIVAC. Oferă o perspectivă autentică asupra începuturilor erei calculatoarelor.",
            ch1_s6_audio: "🎧 Atmosferă Sonoră (Opțional)",
            ch1_s6_audio_title: "Sunetele unei Camere de Calculatoare (anii '50)",
            ch1_s6_audio_subtitle: "Computer Room Ambience — Simulare Sintetizată",
            ch1_s6_audio_status: "Click pentru a genera și reda sunetul",
            ch1_s6_audio_desc: "<strong>Scop:</strong> Acest generator audio recreează atmosfera unei camere de calculatoare din anii '50 — zgomotul ventilatoarelor de răcire, frecvențele joase ale echipamentelor și tonurile caracteristice electronicii din acea eră. Sunetul este generat în timp real folosind Web Audio API, oferind o experiență de imersiune istorică.",
            
            // Navigation
            ch1_nav_next: "Capitolul Următor: Era Mainframe",
            
            // =====================================================================
            // CAPITOLUL 2: Era Mainframe
            // =====================================================================
            ch2_title: "Capitolul 2: Era Mainframe",
            ch2_subtitle: "Capitolul 2: Era Mainframe",
            ch2_lead: "Puterea industrială a calculatoarelor — batch processing, benzi magnetice și nașterea centrelor de date",
            ch2_back: "← Înapoi la Istorie",
            
            // Intro
            ch2_intro: "Imaginează-ți o sală gigantică, plină de dulapuri metalice care horcăie ritmic, bobine de bandă magnetică ce se rotesc neîncetat și operatori în halate albe care introduc teancuri de <span class=\"highlight\">carduri perforate</span>. Aceasta era realitatea anilor <strong>1950–1960</strong> — era <span class=\"key-tag\">mainframe</span>, când calculatoarele au devenit instrumentele puterii industriale.",
            
            // Section 1
            ch2_s1_title: "Context: Nașterea Giganților",
            ch2_s1_p1: "<strong>Mainframe-urile</strong> nu erau simple calculatoare — erau adevărate <em>centrale de procesare</em>, capabile să gestioneze volume uriașe de date pentru bănci, guverne și corporații. Aceste mașini costau milioane de dolari și necesitau echipe întregi de operatori, programatori și ingineri pentru a funcționa.",
            ch2_s1_quote: "Un singur mainframe putea procesa mai multe tranzacții bancare într-o oră decât o armată de contabili într-o lună. Aceasta era revoluția.",
            ch2_s1_p2: "Accesul la aceste sisteme era strict controlat. Utilizatorii nu interacționau direct cu mașina — ei pregăteau <span class=\"key-tag\">job-uri</span> pe carduri perforate, le predau operatorilor, apoi așteptau ore sau chiar zile pentru rezultate.",
            
            // Section 2
            ch2_s2_title: "De Ce a Contat Această Eră?",
            ch2_s2_p1: "Era mainframe a transformat modul în care societatea gestionează informația. Pentru prima dată, organizațiile puteau procesa date la scară <strong>industrială</strong>:",
            ch2_s2_meter1_label: "Centralizare",
            ch2_s2_meter1_desc: "Toate datele și procesarea într-un singur loc controlat și securizat",
            ch2_s2_meter2_label: "Eficiență",
            ch2_s2_meter2_desc: "Procesare automată 24/7, fără pauze sau erori umane",
            ch2_s2_meter3_label: "Securitate",
            ch2_s2_meter3_desc: "Acces fizic controlat, proceduri stricte de operare",
            ch2_s2_li1: "<strong>Bănci și finanțe</strong> — procesarea milioanelor de tranzacții zilnice",
            ch2_s2_li2: "<strong>Guverne</strong> — gestionarea înregistrărilor de recensământ și fiscale",
            ch2_s2_li3: "<strong>Cercetare științifică</strong> — calcule complexe pentru fizică și meteorologie",
            ch2_s2_li4: "<strong>Industria aeriană</strong> — sistemele de rezervări (ex: SABRE)",
            
            // Section 3
            ch2_s3_title: "Batch Processing — Procesarea pe Loturi",
            ch2_s3_p1: "<span class=\"key-tag\">Batch processing</span> a fost inovația care a făcut mainframe-urile viabile economic. În loc ca fiecare utilizator să ruleze programul său individual (ceea ce ar fi irosit timp prețios), job-urile erau <strong>grupate în loturi</strong> și procesate secvențial.",
            ch2_s3_def1_title: "Job Queue (Coada de Job-uri)",
            ch2_s3_def1_desc: "Programele așteptau într-o coadă ordonată. Sistemul le prelua și le executa în ordine, fără intervenție umană.",
            ch2_s3_def2_title: "Carduri Perforate",
            ch2_s3_def2_desc: "Fiecare program era codificat pe zeci sau sute de carduri. Un card căzut sau amestecat putea distruge întreaga execuție.",
            ch2_s3_def3_title: "JCL — Job Control Language",
            ch2_s3_def3_desc: "Un limbaj special pentru descrierea job-urilor: ce resurse necesită, ce fișiere folosesc, în ce ordine se execută pașii.",
            ch2_s3_pipeline_title: "🔄 Fluxul Procesării Batch",
            ch2_s3_step1: "Pregătire",
            ch2_s3_step1_desc: "Carduri perforate",
            ch2_s3_step2: "Coadă",
            ch2_s3_step2_desc: "Job queue",
            ch2_s3_step3: "Execuție",
            ch2_s3_step3_desc: "CPU processing",
            ch2_s3_step4: "Stocare",
            ch2_s3_step4_desc: "Bandă magnetică",
            ch2_s3_step5: "Output",
            ch2_s3_step5_desc: "Rapoarte printate",
            
            // Section 4
            ch2_s4_title: "Multiprogramare — Mai Multe Programe Simultan",
            ch2_s4_p1: "Problemă: când un program aștepta date de pe bandă magnetică (o operație lentă), procesorul stătea <strong>inactiv</strong>. Soluția? <span class=\"key-tag\">Multiprogramarea</span>.",
            ch2_s4_quote: "Ideea revoluționară: încarcă mai multe programe în memorie simultan. Când unul așteaptă I/O, procesorul trece la altul. Utilizarea CPU crește de la ~30% la peste 90%.",
            ch2_s4_p2: "Multiprogramarea a necesitat inovații fundamentale în design-ul sistemelor de operare:",
            ch2_s4_li1: "<strong>Protecția memoriei</strong> — fiecare program își avea zona sa, izolată de celelalte",
            ch2_s4_li2: "<strong>Scheduling</strong> — algoritmi pentru a decide care program rulează când",
            ch2_s4_li3: "<strong>Interrupt handling</strong> — mecanisme pentru a întrerupe și relua programe",
            ch2_s4_li4: "<strong>Spooling</strong> — buffering pentru dispozitive lente (imprimante, cititor carduri)",
            ch2_s4_p3: "Aceste concepte stau la baza <strong>tuturor</strong> sistemelor de operare moderne — de la Windows și Linux până la iOS și Android.",
            
            // Section 5
            ch2_s5_title: "Exemple și Tehnologii Reprezentative",
            ch2_s5_p1: "Iată tehnologiile definitorii ale erei mainframe, care au modelat industria pentru decenii:",
            ch2_s5_card1_year: "1964",
            ch2_s5_card1_title: "IBM System/360",
            ch2_s5_card1_desc: "Revoluția arhitecturii: o <strong>familie</strong> de calculatoare compatibile. Programele scrise pentru modelul mic rulau pe modelul mare. Prima platformă cu adevărat scalabilă din istorie.",
            ch2_s5_card2_year: "1961",
            ch2_s5_card2_title: "CTSS — Compatible Time-Sharing System",
            ch2_s5_card2_desc: "Primul sistem de <strong>time-sharing</strong> funcțional. Permitea mai multor utilizatori să interacționeze simultan cu același computer prin terminale.",
            ch2_s5_card3_year: "1966",
            ch2_s5_card3_title: "OS/360",
            ch2_s5_card3_desc: "Sistemul de operare pentru System/360. Unul dintre cele mai complexe proiecte software din istorie — a necesitat mii de programatori și ani de dezvoltare.",
            ch2_s5_card4_year: "1950s",
            ch2_s5_card4_title: "Benzi Magnetice",
            ch2_s5_card4_desc: "Suport de stocare secvențială de mare capacitate. Bobinele de bandă erau simbolul vizual al centrelor de date. Unele sisteme bancare le folosesc și azi pentru backup.",
            
            // Section 6
            ch2_s6_title: "Impact și Moștenire",
            ch2_s6_p1: "Era mainframe a lăsat o moștenire profundă care influențează informatica și astăzi:",
            ch2_s6_li1: "<strong>Administrare centralizată</strong> — conceptul de data center, cu politici stricte de acces și proceduri de backup",
            ch2_s6_li2: "<strong>Planificare și scheduling</strong> — algoritmi de prioritizare care stau la baza task scheduler-elor moderne",
            ch2_s6_li3: "<strong>Logging și audit</strong> — înregistrarea sistematică a operațiunilor pentru conformitate și debugging",
            ch2_s6_li4: "<strong>Virtualizare</strong> — IBM VM/370 (1972) a introdus conceptul de mașini virtuale, precursor al cloud computing",
            ch2_s6_li5: "<strong>Reliability</strong> — standarde de uptime de 99.999% (\"five nines\") provin din cerințele bancare ale erei mainframe",
            ch2_s6_quote: "Surprinzător: multe bănci și companii aeriene rulează încă software COBOL pe mainframe-uri moderne. IBM produce și vinde mainframe-uri în 2026.",
            
            // Section 7 - Media
            ch2_s7_title: "Experiență Mainframe — Media Interactivă",
            ch2_s7_p1: "Explorează vizual lumea mainframe-urilor prin imagini de arhivă, video educațional și atmosferă sonoră autentică. Aceste resurse te vor transporta în centrele de date ale anilor '60.",
            ch2_s7_gallery: "📷 Galerie Foto: Centre de Date Istorice",
            ch2_s7_img1_title: "IBM System/360 Model 30",
            ch2_s7_img1_desc: "Consola de operare a unui System/360. Observă panoul de control cu LED-uri și comutatoare — interfața principală a operatorului cu mașina.",
            ch2_s7_img2_title: "IBM System/360 Model 40",
            ch2_s7_img2_desc: "Vedere de ansamblu a unui centru de date. Remarcă unitățile de bandă magnetică în fundal și dimensiunea impresionantă a echipamentelor.",
            ch2_s7_img3_title: "Instalație Completă System/360",
            ch2_s7_img3_desc: "Un centru de date tipic al anilor '60. Podelele false ascundeau kilometri de cabluri, iar aerul condiționat era esențial pentru răcirea componentelor.",
            ch2_s7_video: "🎬 Video Educativ: Cum Funcționa un Mainframe",
            ch2_s7_video_title: "Ce să observi în acest video",
            ch2_s7_video_desc: "Acest documentar include segmente despre evoluția calculatoarelor de la ENIAC la era mainframe. Urmărește interviurile cu pionierii industriei și imaginile autentice din centrele de date ale anilor '60-'70. Observă dimensiunea echipamentelor și complexitatea operării lor.",
            ch2_s7_audio: "🎧 Atmosferă Sonoră: Data Center Vintage (Opțional)",
            ch2_s7_audio_title: "Sunetele unui Centru de Date (anii '60)",
            ch2_s7_audio_subtitle: "Mainframe Room Ambience — Simulare",
            ch2_s7_audio_status: "Click pentru a genera și reda sunetul",
            ch2_s7_audio_desc: "<strong>Scop:</strong> Acest generator audio recreează atmosfera unui centru de date din era mainframe — ritmul constant al unităților de bandă, hum-ul transformatoarelor și click-urile periodice ale echipamentelor. Sunetul este generat în browser pentru o experiență de imersiune autentică.",
            
            // Navigation
            ch2_nav_prev: "Capitolul 1: Începuturile",
            ch2_nav_next: "Capitolul 3: Nașterea Unix",

            // =====================================================================
            // CAPITOLUL 3: Nașterea Unix
            // =====================================================================
            ch3_title: "Capitolul 3: Nașterea Unix",
            ch3_subtitle: "Capitolul 3: Nașterea Unix",
            ch3_lead: "Bell Labs, limbajul C și filosofia care a făcut Unix portabil și elegant",
            ch3_back: "← Înapoi la Istorie",
            ch3_intro: "Imaginează-ți un laborator modest din Murray Hill, New Jersey — câțiva cercetători, un calculator <span class='highlight'>PDP-7</span> considerat deja depășit, și o idee simplă: un sistem de operare care face <strong>puțin, dar face bine</strong>. Acesta este momentul nașterii lui Unix — proiectul care a redefinit pentru totdeauna modul în care gândim software-ul.",

            // Section 1: Context
            ch3_s1_title: "Context: De la Multics la Unix",
            ch3_s1_p1: "La sfârșitul anilor <strong>1960</strong>, <span class='key-tag'>Bell Labs</span> (parte din AT&T) era unul dintre cele mai prestigioase laboratoare de cercetare din lume. Informatica, telecomunicațiile și matematica se intersectau aici, iar echipele mici de cercetători aveau libertatea de a explora idei ambițioase.",
            ch3_s1_quote: "Multics a fost un vis grandios. Unix a fost reacția practică — demonstrația că simplitatea poate fi mai puternică decât complexitatea.",
            ch3_s1_quote_cite: "— Reflecție despre filosofia Bell Labs",
            ch3_s1_p2: "Bell Labs participase la proiectul <span class='key-tag'>Multics</span> (Multiplexed Information and Computing Service) — un sistem ambițios de time-sharing dezvoltat alături de MIT și GE. Deși inovator, Multics devenise prea complex și costisitor. Când Bell Labs s-a retras din proiect în 1969, doi cercetători au decis să înceapă de la zero:",
            ch3_s1_li1: "<strong>Ken Thompson</strong> — a scris prima versiune de Unix pe un PDP-7, în doar câteva săptămâni, parțial motivat de dorința de a juca un joc (Space Travel)",
            ch3_s1_li2: "<strong>Dennis Ritchie</strong> — a creat limbajul C specific pentru a putea rescrie Unix portabil, eliminând dependența de limbaj de asamblare",
            ch3_s1_li3: "<strong>Brian Kernighan</strong> — a dat numele „Unix” (un joc de cuvinte pe Multics: „uni” vs. „multi”) și a contribuit la documentația clasică",
            ch3_s1_li4: "<strong>PDP-7, apoi PDP-11</strong> — hardware-ul modest pe care Unix a fost rafinat, demonstrând că un SO puternic nu necesită mașini scumpe",

            // Section 2: De ce a apărut
            ch3_s2_title: "De Ce a Apărut Unix?",
            ch3_s2_p1: "Unix nu a fost un proiect planificat de o corporație. A fost creat de programatori <strong>pentru programatori</strong>, ca răspuns la frustrări reale cu sistemele existente:",
            ch3_s2_meter1_label: "Simplitate",
            ch3_s2_meter1_desc: "Reacție la complexitatea Multics — fiecare componentă trebuia să fie minimală și clară",
            ch3_s2_meter2_label: "Portabilitate",
            ch3_s2_meter2_desc: "Scris în C, nu în asamblare — putea fi mutat pe orice arhitectură hardware",
            ch3_s2_meter3_label: "Colaborare",
            ch3_s2_meter3_desc: "Distribuit gratuit universităților, creând prima comunitate open-source",
            ch3_s2_p2: "Time-sharing-ul eficient, uneltele reutilizabile și suportul multi-user au făcut Unix perfect pentru mediul academic. AT&T nu putea vinde software (din cauza unui acord antitrust), așa că Unix a fost distribuit universităților aproape gratuit — o decizie care i-a accelerat enorm adoptarea.",

            // Section 3: Filosofia Unix
            ch3_s3_title: "Filosofia Unix — „Do One Thing Well”",
            ch3_s3_p1: "Unix nu era doar un sistem de operare — era o <strong>filosofie de design</strong>. În loc de programe monolitice care fac totul, Unix promova componente mici, specializate, care se combină elegant:",
            ch3_s3_c1_title: "Fă Un Singur Lucru Bine",
            ch3_s3_c1_desc: "Fiecare program trebuie să facă o singură sarcină, dar să o facă perfect. grep caută text. sort sortează. wc numără.",
            ch3_s3_c2_title: "Compune prin Pipe-uri",
            ch3_s3_c2_desc: "Ieșirea unui program devine intrarea altuia prin operatorul |. Combinații infinite din piese simple.",
            ch3_s3_c3_title: "Totul Este un Fișier",
            ch3_s3_c3_desc: "Dispozitive, procese, socket-uri — toate sunt accesate ca fișiere. O singură interfață uniformă pentru tot.",
            ch3_s3_c4_title: "Text ca Format Universal",
            ch3_s3_c4_desc: "Datele circulă ca text simplu între programe. Oricine poate inspecta, filtra și transforma fluxul de date.",
            ch3_s3_c5_title: "Scriptare și Automatizare",
            ch3_s3_c5_desc: "Shell-ul nu este doar o interfață — este un limbaj de programare. Orice secvență de comenzi devine un script reutilizabil.",
            ch3_s3_pipe_title: "$ cat /var/log/access.log | grep \"ERROR\" | sort | uniq -c | head -10",
            ch3_s3_step1: "cat",
            ch3_s3_step1_desc: "Citește fișierul",
            ch3_s3_step2: "grep",
            ch3_s3_step2_desc: "Filtrează linii",
            ch3_s3_step3: "sort",
            ch3_s3_step3_desc: "Sortează",
            ch3_s3_step4: "uniq -c",
            ch3_s3_step4_desc: "Numără unice",
            ch3_s3_step5: "head",
            ch3_s3_step5_desc: "Top 10 rezultate",

            // Section 4: Caracteristici Tehnice
            ch3_s4_title: "Arhitectură și Caracteristici Tehnice",
            ch3_s4_p1: "Scrierea nucleului în <span class='key-tag'>limbajul C</span> (dezvoltat de Ritchie special pentru acest scop) a fost decizia care a schimbat totul. Pentru prima dată, un sistem de operare putea fi <strong>portat</strong> pe hardware diferit prin simplă recompilare.",
            ch3_s4_def1_title: "Multi-User & Time-Sharing",
            ch3_s4_def1_desc: "Mai mulți utilizatori conectați simultan prin terminale, fiecare cu propriile permisiuni și sesiune izolată.",
            ch3_s4_def2_title: "Multitasking Preemptiv",
            ch3_s4_def2_desc: "Nucleul decide când să comute între procese. Niciun program nu poate monopoliza procesorul — echitate garantată.",
            ch3_s4_def3_title: "Sistem de Fișiere Ierarhic",
            ch3_s4_def3_desc: "Structura de directoare arborescentă (/, /usr, /etc, /home) — modelul copiat de toate SO-urile moderne.",
            ch3_s4_def4_title: "Procese și Semnale",
            ch3_s4_def4_desc: "Fiecare program rulează ca un proces cu PID unic. Semnalele (SIGTERM, SIGKILL) permit controlul fin al execuției.",
            ch3_s4_quote: "Unix a demonstrat că un sistem de operare nu trebuie să fie mare pentru a fi puternic. Nucleul original avea sub 10.000 de linii de cod.",
            ch3_s4_quote_cite: "— Despre eleganta simplitate a Unix-ului",

            // Section 5: Exemple și Tehnologii
            ch3_s5_title: "Exemple și Tehnologii Reprezentative",
            ch3_s5_p1: "Din ecosistemul Unix au apărut tehnologii și instrumente care formează baza informaticii moderne. Iată cele mai importante:",
            ch3_s5_card1_year: "1969",
            ch3_s5_card1_title: "PDP-7 → PDP-11",
            ch3_s5_card1_desc: "Ken Thompson a scris prima versiune Unix pe un <strong>PDP-7</strong> în limbaj de asamblare. Migrarea pe PDP-11 (1970) și rescrierea în C (1973) au stabilit modelul: un SO portabil, compact și puternic.",
            ch3_s5_card2_year: "1972",
            ch3_s5_card2_title: "Limbajul C",
            ch3_s5_card2_desc: "Dennis Ritchie a creat C evoluând din B (Thompson). Combina <strong>controlul low-level</strong> al asamblării cu productivitatea unui limbaj de nivel înalt. Nucleul Unix rescris în C a avut ~95% cod portabil.",
            ch3_s5_card3_year: "1970s",
            ch3_s5_card3_title: "grep, sed, awk & Tools",
            ch3_s5_card3_desc: "Suite-ul de utilitare text Unix: <strong>grep</strong> (căutare pattern), <strong>sed</strong> (editare stream), <strong>awk</strong> (procesare tabulară). Aceste instrumente sunt folosite zilnic de milioane de dezvoltatori și în 2026.",
            ch3_s5_card4_year: "1977–1983",
            ch3_s5_card4_title: "BSD & System V",
            ch3_s5_card4_desc: "Unix s-a ramificat: <strong>BSD</strong> (Berkeley Software Distribution) a adăugat TCP/IP networking, iar <strong>System V</strong> (AT&T) a definit standardele comerciale. Ambele ramuri au influențat toate SO-urile ulterioare.",

            // Section 6: Impact
            ch3_s6_title: "Impact și Moștenire",
            ch3_s6_p1: "Unix a redefinit modul în care gândim software-ul. Moștenirea sa este prezentă în fiecare colț al lumii digitale moderne:",
            ch3_s6_li1: "<strong>Linux</strong> — Linus Torvalds a creat Linux (1991) inspirat direct de Unix. Astăzi, Linux rulează pe ~96% din serverele web, în telefoanele Android și în supercomputerele top 500.",
            ch3_s6_li2: "<strong>macOS & iOS</strong> — Apple a construit macOS pe bază de BSD/NeXTSTEP, făcând fiecare Mac și iPhone un descendent direct al Unix.",
            ch3_s6_li3: "<strong>POSIX & Standarde</strong> — Standardul POSIX asigură compatibilitatea între implementările Unix-like, de la AIX la FreeBSD.",
            ch3_s6_li4: "<strong>DevOps & Cloud</strong> — Containerele Docker, Kubernetes, CI/CD pipelines — toate se bazează pe principii Unix: modularitate, compunere, automatizare.",
            ch3_s6_li5: "<strong>Cultura Open Source</strong> — Distribuirea Unix în universități a creat primul model de software colaborativ, precursor al mișcării open-source moderne.",
            ch3_s6_quote: "Fiecare terminal pe care îl deschizi, fiecare comandă pe care o scrii în Linux sau macOS — ești la un keystroke distanță de spiritul lui Thompson și Ritchie din 1969.",

            // Section 7: Media
            ch3_s7_title: "Experiență Unix — Media Interactivă",
            ch3_s7_p1: "Explorează vizual lumea Unix prin fotografii de arhivă din Bell Labs, video educațional, un terminal interactiv demonstrativ și atmosferă sonoră de epocă.",
            ch3_s7_gallery: "📷 Galerie Foto: Bell Labs și Pionierii Unix",
            ch3_s7_img1_title: "Thompson & Ritchie (1973)",
            ch3_s7_img1_desc: "Ken Thompson (stânga) și Dennis Ritchie (dreapta) la un terminal PDP-11 în Bell Labs — momentul definitoriu al creației Unix.",
            ch3_s7_img2_title: "DEC PDP-11/40",
            ch3_s7_img2_desc: "Minicomputerul pe care Unix a fost rafinat și rescris în C. Cu resurse modeste, a demonstrat că un SO puternic nu necesită hardware scump.",
            ch3_s7_img3_title: "Rack-uri DEC PDP",
            ch3_s7_img3_desc: "Rack-uri și console DEC — mediul tipic în care cercetătorii Bell Labs lucrau cu primele versiuni de Unix prin terminale text.",
            ch3_s7_video: "🎬 Video Educativ: Povestea Unix",
            ch3_s7_video_title: "De ce acest video?",
            ch3_s7_video_desc: "„AT&T Archives: The UNIX Operating System” — un film din arhivele AT&T care prezintă Unix direct din perspectiva creatorilor săi. Include demonstrații ale pipe-urilor, shell-ului și filosofiei de design care au revoluționat industria.",
            ch3_s7_terminal_heading: "💻 Terminal Demonstrativ Unix",
            ch3_term_comment1: "# Cine suntem și unde ne aflăm?",
            ch3_term_comment2: "# Listăm structura de directoare",
            ch3_term_comment3: "# Puterea pipe-urilor: combinăm comenzi",
            ch3_s7_audio: "🎧 Atmosferă Sonoră: Terminal Room (Opțional)",
            ch3_s7_audio_title: "Sunetele unui Terminal Room (anii '70)",
            ch3_s7_audio_subtitle: "Unix Terminal Ambience — Simulare Sintetizată",
            ch3_s7_audio_status: "Click pentru a genera și reda sunetul",
            ch3_s7_audio_desc: "<strong>Scop:</strong> Acest generator audio recreează atmosfera unui terminal room din anii '70 — zgomotul ventilatorelor, click-urile ritmice ale tastaturii unui teletype, tonurile caracteristice modemurilor și humul constant al minicomputerelor. Sunetul este generat în timp real folosind Web Audio API.",

            // Navigation
            ch3_nav_prev: "Capitolul 2: Era Mainframe",
            ch3_nav_next: "Capitolul 4: Era PC",

            // =====================================================================
            // CAPITOLUL 4: Era PC și GUI
            // =====================================================================
            ch4_title: "Capitolul 4: Era PC și GUI",
            ch4_subtitle: "Capitolul 4: Era PC și GUI",
            ch4_lead: "MS-DOS, Macintosh și revoluția care a transformat calculatorul dintr-un instrument profesional într-un partener de zi cu zi",
            ch4_back: "← Înapoi la Istorie",
            ch4_intro: "Imaginează-ți un birou din anii <span class='highlight'>1980</span>: un ecran mic, o tastatură voluminoasă și un cursor verde clipind pe fundal negru. Apoi, într-o zi, apare ceva nou — o <strong>fereastră</strong>, o <strong>iconiță</strong>, un <strong>mouse</strong>. Calculatorul nu mai vorbește doar limba programatorilor. Acesta este momentul în care tehnologia a început să fie pentru <em>toată lumea</em>.",

            // Section 1: Context Istoric
            ch4_s1_title: "Context Istoric",
            ch4_s1_p1: "La începutul anilor <strong>1980</strong>, calculatoarele erau încă instrumente specializate. Mainframe-urile dominau corporațiile, iar minicomputerele erau în universități. Dar o schimbare tectonică era pe cale să aibă loc: <span class='gui-tag'>calculatorul personal</span> (PC) urma să aducă puterea de calcul pe biroul fiecărui om.",
            ch4_s1_quote: "Calculatorul personal a fost cea mai democratizatoare invenție din istoria tehnologiei. A luat puterea de calcul de la instituții și a dat-o individului.",
            ch4_s1_quote_cite: "— Reflecție despre revoluția PC-ului",
            ch4_s1_p2: "Evenimentele-cheie care au pregătit terenul pentru era PC-ului au fost:",
            ch4_s1_li1: "<strong>1975 — Altair 8800</strong> — primul microcomputer comercial, vândut ca kit. A inspirat o generație de entuziaști, inclusiv Bill Gates și Paul Allen.",
            ch4_s1_li2: "<strong>1977 — Apple II, Commodore PET, TRS-80</strong> — &bdquo;trinitatea&rdquo; calculatoarelor personale. Apple II a fost primul cu grafică color și sunet.",
            ch4_s1_li3: "<strong>1981 — IBM PC</strong> — lansarea care a legitimat piața calculatoarelor personale. Arhitectura deschisă a creat un ecosistem uriaș de clone compatibile.",
            ch4_s1_li4: "<strong>1984 — Apple Macintosh</strong> — primul calculator comercializat pe scară largă cu interfață grafică integrată, mouse și metafora &bdquo;desktop&rdquo;.",

            // Section 2: De ce a fost importantă apariția PC-ului?
            ch4_s2_title: "De Ce a Fost Importantă Apariția PC-ului?",
            ch4_s2_p1: "Până la apariția PC-ului, calculatoarele erau domeniul exclusiv al specialiștilor. PC-ul a schimbat radical această paradigmă, aducând calculatorul în case, școli și birouri mici:",
            ch4_s2_meter1_label: "Accesibilitate",
            ch4_s2_meter1_desc: "Prețul unui PC a scăzut de la milioane de dolari (mainframe) la câteva mii de dolari — accesibil pentru familii și afaceri mici",
            ch4_s2_meter2_label: "Independență",
            ch4_s2_meter2_desc: "Utilizatorii nu mai depindeau de un departament IT central — aveau propriul calculator, cu propriile programe",
            ch4_s2_meter3_label: "Productivitate",
            ch4_s2_meter3_desc: "Procesoare de text, foi de calcul și baze de date au transformat modul în care lumea lucrează",
            ch4_s2_li1: "<strong>Educație</strong> — copiii au început să învețe programare și să folosească calculatoare în școli",
            ch4_s2_li2: "<strong>Afaceri mici</strong> — antreprenorii puteau gestiona contabilitatea și corespondența digital",
            ch4_s2_li3: "<strong>Creativitate</strong> — desktop publishing, muzică digitală și primele jocuri video de acasă",
            ch4_s2_li4: "<strong>Comunicare</strong> — BBS-uri (Bulletin Board Systems) și primele rețele de comunicare între calculatoare",

            // Section 3: Trecerea de la CLI la GUI
            ch4_s3_title: "Trecerea de la CLI la GUI — Revoluția Vizuală",
            ch4_s3_p1: "Sistemele timpurii de PC, precum <span class='gui-tag'>MS-DOS</span>, foloseau o <strong>interfață în linie de comandă</strong> (CLI — Command Line Interface). Utilizatorul trebuia să memoreze comenzi text exacte pentru a executa orice operație, de la copierea unui fișier până la lansarea unui program.",
            ch4_s3_quote: "CLI: putere enormă, dar barieră de intrare ridicată. GUI: mai puțin control fin, dar accesibil pentru toată lumea. Aceasta a fost dezbaterea definitoraie a anilor '80.",
            ch4_s3_p2: "Conceptul revoluționar a fost <span class='gui-tag'>WIMP</span> — un acronim care definește paradigma GUI:",
            ch4_s3_c1_title: "W — Windows (Ferestre)",
            ch4_s3_c1_desc: "Fiecare program rulează într-o zonă vizuală separată (fereastră) care poate fi mutată, redimensionată, minimizată sau maximizată. Mai multe ferestre pot fi vizibile simultan.",
            ch4_s3_c2_title: "I — Icons (Iconițe)",
            ch4_s3_c2_desc: "Reprezentări vizuale ale fișierelor, folderelor și programelor. În loc să tastezi \"del report.txt\", tragi iconița în coșul de gunoi.",
            ch4_s3_c3_title: "M — Menus (Meniuri)",
            ch4_s3_c3_desc: "Liste organizate de comenzi disponibile, grupate logic (File, Edit, View). Nu mai trebuie să memorezi — doar alegi dintr-o listă.",
            ch4_s3_c4_title: "P — Pointer (Indicator/Mouse)",
            ch4_s3_c4_desc: "Dispozitivul de indicare (mouse) permite interacțiune directă cu elementele de pe ecran — click, drag, drop. Mâna devine extensia minții pe ecran.",
            ch4_s3_p3: "Această tranziție nu a fost doar cosmetică — a fost o <strong>revoluție cognitivă</strong>. GUI-ul a redus drastic curba de învățare, permițând milioanelor de oameni fără pregătire tehnică să folosească calculatorul productiv.",

            // Section 4: Exemple de Sisteme de Operare
            ch4_s4_title: "Exemple de Sisteme de Operare",
            ch4_s4_p1: "Era PC-ului a produs o serie de sisteme de operare care au definit modul în care interacționăm cu calculatoarele:",
            ch4_s4_card1_year: "1981",
            ch4_s4_card1_title: "MS-DOS — Microsoft Disk Operating System",
            ch4_s4_card1_desc: "Interfață CLI pură. Comenzi text pentru toate operațiile. <strong>Rapid și eficient</strong>, dar dificil pentru începători. A dominat piața PC-urilor timp de un deceniu și a pus bazele imperiului Microsoft.",
            ch4_s4_card2_year: "1984",
            ch4_s4_card2_title: "Apple Macintosh — System 1",
            ch4_s4_card2_desc: "Primul calculator comercial cu <strong>GUI integrat</strong> și mouse inclus. Metafora desktop-ului (fișiere, foldere, coș de gunoi) a devenit standard mondial. Inspirat de cercetările Xerox PARC.",
            ch4_s4_card3_year: "1985–1990",
            ch4_s4_card3_title: "Windows 1.0 → 3.1",
            ch4_s4_card3_desc: "Microsoft a adus <strong>GUI pe platforma DOS</strong>. Windows 1.0 era modest, dar Windows 3.1 (1992) a fost un succes masiv — ferestre suprapuse, Program Manager și suport multimedia.",
            ch4_s4_card4_year: "1995",
            ch4_s4_card4_title: "Windows 95",
            ch4_s4_card4_desc: "Punctul de cotitură. <strong>Butonul Start, taskbar, Explorer</strong> — paradigma care definește Windows și astăzi. A vândut 7 milioane de copii în primele 5 săptămâni. A făcut GUI-ul standard pe PC.",

            // Section 5: Impact asupra Utilizatorilor
            ch4_s5_title: "Impact asupra Utilizatorilor",
            ch4_s5_p1: "Trecerea la GUI a transformat relația omului cu calculatorul. Nu mai era nevoie de cunoștințe tehnice avansate — interfața vizuală a deschis o lume nouă:",
            ch4_s5_li1: "<strong>Curba de învățare drastically redusă</strong> — oricine putea învăța să folosească un Mac sau Windows în câteva ore, nu în săptămâni",
            ch4_s5_li2: "<strong>Metafore familiare</strong> — desktop (birou), folder (dosar), trash (coș de gunoi) — concepte deja conocute din lumea fizică",
            ch4_s5_li3: "<strong>Multitasking vizual</strong> — utilizatorii puteau vedea și comuta între mai multe programe simultan prin ferestre",
            ch4_s5_li4: "<strong>Accesibilitate</strong> — persoanele cu dizabilități au beneficiat de interfețe vizuale, zoom, screen readers și input alternativ",
            ch4_s5_li5: "<strong>Creativitate digitală</strong> — desktop publishing (PageMaker, 1985), editare foto, muzică — GUI a deschis arta digitală",
            ch4_s5_quote: "GUI-ul nu a făcut calculatorul mai puternic — l-a făcut mai uman. A transformat o mașină de calcul într-un instrument de exprimare.",

            // Section 6: Impact și Moștenire
            ch4_s6_title: "Impact și Moștenire",
            ch4_s6_p1: "Revoluția PC-ului și a GUI-ului a lăsat o moștenire care definește lumea digitală de astăzi:",
            ch4_s6_li1: "<strong>Paradigma WIMP</strong> — Windows, Icons, Menus, Pointer — rămâne fundamentul interacțiunii desktop în 2026, de la Windows 11 la macOS și Linux",
            ch4_s6_li2: "<strong>Standardizare</strong> — convențiile GUI (dublu-click, drag & drop, Ctrl+C/Ctrl+V) sunt universale și intuitive",
            ch4_s6_li3: "<strong>Industria software</strong> — PC-ul a creat piața software-ului comercial: procesoare de text, spreadsheets, baze de date, jocuri",
            ch4_s6_li4: "<strong>Internet și web</strong> — GUI-ul a făcut posibil browserul web vizual (Mosaic, Netscape), deschizând era internetului pentru toți",
            ch4_s6_li5: "<strong>Mobile și touch</strong> — paradigma GUI a evoluat în interfețe touch (iPhone, 2007), gesture-based și voice UI — dar principiile de bază rămân aceleași",
            ch4_s6_quote: "Fiecare fereastră pe care o deschizi, fiecare icon pe care dai click, fiecare meniu pe care îl explorezi — ești moștenitorul direct al vizionarilor de la Xerox PARC, Apple și Microsoft din anii '80.",

            // Section 7: Media
            ch4_s7_title: "Experiență GUI — Media și Vizualizare",
            ch4_s7_p1: "Explorează vizual revoluția GUI prin imagini istorice, video educațional și un mockup interactiv care demonstrează conceptele unei interfețe grafice.",
            ch4_s7_gallery: "📷 Galerie Foto: Revoluția GUI",
            ch4_s7_img1_title: "Apple Macintosh (1984)",
            ch4_s7_img1_desc: "Interfața originală Macintosh System 1. Observă metafora desktop-ului: iconițe, ferestre, meniuri și coșul de gunoi. Această paradigmă revoluționară definește încă modul în care folosim calculatoarele.",
            ch4_s7_img2_title: "Windows 3.1 (1992)",
            ch4_s7_img2_desc: "Program Manager în Windows 3.1 — primul mare succes GUI al Microsoft. Ferestre suprapuse, iconițe de program și suport multimedia au adus GUI-ul la sute de milioane de utilizatori PC.",
            ch4_s7_img3_title: "Xerox Alto & Mouse (1973)",
            ch4_s7_img3_desc: "Xerox Alto — stația de lucru experimentală de la Xerox PARC care a inventat conceptul GUI modern. Mouse-ul, ferestrele și meniurile au fost prototipate aici cu un deceniu înaintea Macintosh-ului.",
            ch4_s7_video: "🎬 Video Educativ: Evoluția GUI",
            ch4_s7_video_title: "Ce să observi în acest video",
            ch4_s7_video_desc: "Prezentarea originală a Apple Macintosh din 1984 — momentul istoric în care Steve Jobs a demonstrat public interfața grafică pentru mase. Observă reacția publicului la conceptele de drag & drop, meniuri și ferestre — lucruri banale astăzi, revoluționare atunci.",
            ch4_s7_mockup_title: "🖥️ Mockup Interactiv: Cum Arăta un GUI Timpuriu",
            ch4_s7_mockup_desc: "Acest mockup demonstrează vizual elementele fundamentale ale unei interfețe grafice — ferestrele, iconițele, meniurile și butoanele care au definit paradigma GUI.",

            // Navigation
            ch4_nav_prev: "Capitolul 3: Nașterea Unix",
            ch4_nav_next: "Capitolul 5: Linux și Open Source"
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
            history_intro_title: "History of Operating Systems",
            history_intro_subtitle: "From punched cards to cloud and artificial intelligence",
            history_chapters_title: "Chapters of Operating Systems History",
            history_chapters_hint: "Click on a chapter to explore each period of operating systems history in detail!",
            history_ch1_index: "Chapter 1:",
            history_ch1_title: "The Beginnings of Operating Systems",
            history_ch1_desc: "The first computers, first interfaces, GM-NAA I/O",
            history_ch2_index: "Chapter 2:",
            history_ch2_title: "The Mainframe Era",
            history_ch2_desc: "Batch processing, punch cards, multiprogramming",
            history_ch3_index: "Chapter 3:",
            history_ch3_title: "The Birth of Unix",
            history_ch3_desc: "Bell Labs, portability, influence on modern OSs",
            history_ch4_index: "Chapter 4:",
            history_ch4_title: "The PC and GUI Era",
            history_ch4_desc: "MS-DOS, Macintosh, Windows, graphical interface",
            history_ch5_index: "Chapter 5:",
            history_ch5_title: "Linux and Open Source",
            history_ch5_desc: "Linus Torvalds, the open source movement, servers",
            history_ch6_index: "Chapter 6:",
            history_ch6_title: "The Modern Era",
            history_ch6_desc: "Windows, macOS, Linux, mobile, cloud, AI",
            
            // Comparison page
            comparison_title: "Operating Systems Comparison",
            comparison_subtitle: "Detailed analysis of current operating systems",
            comparison_market_title: "📊 Interactive Market Share",
            comparison_desktop_title: "💻 Desktop OS Market Share",
            comparison_mobile_title: "📱 Mobile OS Market Share",
            comparison_server_title: "🖥️ Server OS Market Share",
            comparison_other: "Other",
            
            // Glossary page
            glossary_title: "📚 Complete Operating Systems Glossary",
            glossary_subtitle: "Over 50 technical terms explained in detail with practical examples",
            glossary_search: "Search term...",
            // Glossary categories (EN)
            gl_category_kernel: "Kernel & Core Components",
            gl_category_kernel_sub: "The operating system kernel and core components",
            gl_category_process: "Processes & Threads",
            gl_category_process_sub: "Program execution and task management",
            gl_category_memory: "Memory Management",
            gl_category_memory_sub: "RAM, virtual memory and allocation techniques",
            gl_category_filesystem: "File Systems",
            gl_category_filesystem_sub: "Organization and storage of data on disk",
            gl_category_security: "Security & Permissions",
            gl_category_security_sub: "System protection and access control",
            gl_category_interface: "User Interfaces",
            gl_category_interface_sub: "GUI, CLI and interaction modes",
            gl_category_io: "I/O & Interrupts",
            gl_category_io_sub: "Communication with devices and event handling",
            gl_category_api: "API & Programming",
            gl_category_api_sub: "Programming interfaces and development",
            // Glossary terms (EN) - main entries
            gl_kernel_title: "Kernel",
            gl_kernel_desc: "The central component and core of an operating system. The kernel acts as a bridge between applications and hardware, managing system resources and providing essential services to programs.",
            gl_syscall_title: "System Call",
            gl_syscall_desc: "The mechanism by which a user-space program requests a service from the kernel. System calls are the controlled gateway to hardware resources and privileged operations.",
            gl_driver_title: "Driver",
            gl_driver_desc: "Specialized software that allows the operating system to communicate with a specific hardware device. Drivers translate generic OS requests into device-specific commands.",
            gl_bootloader_title: "Bootloader",
            gl_bootloader_desc: "The initial program that runs when a computer starts. The bootloader initializes hardware, loads the kernel into memory, and transfers control to it.",
            gl_bios_title: "BIOS (Basic Input/Output System)",
            gl_bios_desc: "Traditional firmware stored on a motherboard chip that initializes hardware and starts the boot process. Largely replaced by UEFI on modern systems.",
            gl_uefi_title: "UEFI (Unified Extensible Firmware Interface)",
            gl_uefi_desc: "Modern firmware that offers more advanced interfaces than BIOS, support for large disks, and security features such as Secure Boot.",
            gl_process_title: "Process",
            gl_process_desc: "An instance of a program in execution. Each process has its own address space, allocated resources, and at least one thread. Processes are isolated for security and stability.",
            gl_thread_title: "Thread",
            gl_thread_desc: "The smallest schedulable unit of execution within a process. Threads in the same process share address space and resources but have separate stacks and registers.",
            gl_scheduler_title: "Scheduler",
            gl_scheduler_desc: "Kernel component that decides which process/thread receives CPU time and for how long. Aims to maximize CPU utilization and minimize waiting time.",
            gl_deadlock_title: "Deadlock",
            gl_deadlock_desc: "A situation where two or more processes are permanently blocked, each waiting for resources held by the others. No process can proceed.",
            gl_ram_title: "RAM (Random Access Memory)",
            gl_ram_desc: "The main volatile memory of a computer where programs and data are loaded during execution. Fast access but contents lost when power is removed.",
            gl_vmem_title: "Virtual Memory",
            gl_vmem_desc: "A memory management technique that provides the illusion of a larger RAM by using disk space as an extension of physical memory.",
            gl_cache_title: "Cache",
            gl_cache_desc: "Very fast memory located between the CPU and RAM that stores copies of frequently accessed data to reduce memory access latency.",
            // Additional glossary UI headings (EN) - used inside glossary page
            gl_term_functions: "🔧 Main functions:",
            gl_kernel_types: "🧩 Kernel types:",
            gl_how_it_works: "⚙️ How it works:",
            gl_driver_types: "🔌 Driver types:",
            gl_boot_process: "🚀 Boot process:",
            gl_bios_limits: "❗ BIOS limitations:",
            gl_uefi_advantages: "🔒 UEFI advantages:",
            gl_ram_types: "🧠 RAM types:",
            gl_cache_levels: "📦 Cache levels:",
            gl_filesystem_popular: "🗂️ Popular file systems:",
            gl_inode_contains: "📌 What an inode contains:",
            gl_partition_schemes: "📑 Partitioning schemes:",
            gl_unix_permissions: "🔐 Unix permissions (chmod):",
            gl_mutex_ops: "⚙️ Mutex operations:",
            gl_gui_components: "🧩 GUI components:",
            gl_shells_popular: "🐚 Popular shells:",
            gl_shell_features: "⚙️ Shell features:",
            gl_interrupt_types: "🔔 Interrupt types:",
            gl_io_methods: "🔌 I/O methods:",
            gl_api_types: "🔗 API types:",
            gl_posix_standardizes: "📜 What POSIX standardizes:",
            gl_filesystem_title: "File System",
            gl_filesystem_desc: "The method and data structures used to organize, store, find, and access files on a storage device.",
            gl_inode_title: "Inode",
            gl_inode_desc: "A data structure in Unix/Linux file systems that stores file metadata (permissions, owner, timestamps, disk location) — everything except the filename.",
            gl_partition_title: "Partition",
            gl_partition_desc: "A logical section of a disk that can be formatted with its own file system, allowing data organization and isolation.",
            gl_permissions_title: "Permissions",
            gl_permissions_desc: "Rules that define what operations can be performed on a file or resource and by whom. Fundamental to system security.",
            gl_mutex_title: "Mutex",
            gl_mutex_desc: "A synchronization primitive that allows only one thread to access a shared resource at a time, preventing race conditions.",
            gl_race_title: "Race Condition",
            gl_race_desc: "A situation where program behavior depends on the relative ordering or timing of uncontrolled events, leading to unpredictable results.",
            gl_gui_title: "GUI (Graphical User Interface)",
            gl_gui_desc: "Graphical interface allowing users to interact with the system via visual elements such as windows, buttons, menus and icons.",
            gl_cli_title: "CLI (Command Line Interface)",
            gl_cli_desc: "A text interface where the user types commands to interact with the system. Offers precise control and automation via scripts.",
            gl_shell_title: "Shell",
            gl_shell_desc: "Program that interprets user commands and forwards them to the kernel for execution. Can be graphical (Explorer/Finder) or text-based (Bash/PowerShell).",
            gl_interrupt_title: "Interrupt",
            gl_interrupt_desc: "A hardware or software signal that interrupts normal CPU execution to handle an urgent event (e.g., key press, network data).",
            gl_io_title: "I/O (Input/Output)",
            gl_io_desc: "Communication between the system and external devices. Input = data received, Output = data sent.",
            gl_api_title: "API",
            gl_api_desc: "A set of functions, protocols, and tools that allow applications to communicate with each other or with the operating system in a standardized way.",
            gl_posix_title: "POSIX",
            gl_posix_desc: "Portable Operating System Interface — a family of IEEE standards defining APIs for compatibility among Unix-like systems.",
            // Additional small term titles used as related-tags (EN)
            gl_privileges_title: "Privileges",
            gl_rom_title: "ROM",
            gl_secure_boot_title: "Secure Boot",
            gl_context_switching_title: "Context Switching",
            gl_semaphore_title: "Semaphore",
            gl_page_fault_title: "Page Fault",
            gl_mmu_title: "MMU",
            gl_cpu_title: "CPU",
            gl_mount_title: "Mount",
            gl_hardlink_title: "Hard Link",
            gl_root_title: "Root",
            gl_terminal_title: "Terminal",
            gl_dma_title: "DMA",
            gl_unix_title: "Unix",
            
            // FAQ page
            faq_title: "❓ Frequently Asked Questions",
            faq_subtitle: "Answers to popular questions",

            // FAQ - questions and answers (EN)
            faq_q1: "What is the difference between the kernel and the OS?",
            faq_a1: "The kernel is the core of the OS that manages resources. The operating system includes the kernel plus drivers, utilities, applications and the user interface.",
            faq_q2: "Why is Windows the most popular OS?",
            faq_a2: "Windows became widespread due to hardware compatibility, user familiarity, and broad software/game support.",
            faq_q3: "Is Linux really free?",
            faq_a3: "Yes — the Linux kernel and most associated tools are open-source and free; some distributions offer paid commercial support.",
            faq_q4: "What is multitasking?",
            faq_a4: "Multitasking allows multiple programs to appear to run simultaneously by rapidly switching CPU execution between processes.",
            faq_q5: "Which OS is the most secure?",
            faq_a5: "It depends: iOS/macOS are very secure for end users; Linux is strong on servers; Windows requires more active security maintenance.",
            faq_q6: "Can I run Windows on a Mac?",
            faq_a6: "On Intel Macs you can use virtualization (Parallels/VMware). Native support on Apple Silicon (M1/M2) is limited.",
            faq_q7: "Why does Android dominate mobile?",
            faq_a7: "Android is flexible, open-source and adopted by many manufacturers; iOS is limited to Apple hardware.",
            faq_q8: "What is cloud computing?",
            faq_a8: "Cloud computing provides IT resources (servers, storage, applications) over the internet instead of locally.",
            faq_q9: "What is the future of operating systems?",
            faq_a9: "Expect AI integration, hybrid cloud-local systems, stronger security and more natural interfaces (voice/gesture).",
            faq_q10: "Can I build my own OS?",
            faq_a10: "Yes, but it is complex; small educational projects (bootloader + minimal kernel) are realistic starter goals.",

            // Resources (EN)
            resources_books_title: "📚 Recommended Books",
            resources_book1_title: "Operating Systems: Three Easy Pieces",
            resources_book1_desc: "One of the best books for understanding OS concepts. Freely available online.",
            resources_book2_title: "Modern Operating Systems",
            resources_book2_desc: "A classic, comprehensive OS book with real-world examples.",
            resources_book3_title: "The Linux Programming Interface",
            resources_book3_desc: "In-depth reference for programmers who want to understand Linux at the system level.",
            resources_courses_title: "🎓 Online Courses",
            resources_course1_title: "MIT OpenCourseWare",
            resources_course1_sub: "6.828 Operating System Engineering",
            resources_course1_desc: "Free MIT course from one of the world's top universities.",
            resources_course2_title: "Coursera",
            resources_course2_sub: "Operating Systems Design and Implementation",
            resources_course2_desc: "Interactive courses with optional certification.",
            resources_course3_title: "Udacity",
            resources_course3_sub: "Operating Systems Nanodegree",
            resources_course3_desc: "Intensive program for developers who want to specialize in OS design.",
            resources_sites_title: "🌐 Informative Sites",
            resources_site1_title: "The Linux Foundation",
            resources_site1_desc: "Organization that supports Linux. Info, training, and community.",
            resources_site2_title: "Wikipedia - Operating Systems",
            resources_site2_desc: "Detailed articles and references for many OS topics.",
            resources_site3_title: "OS.js",
            resources_site3_desc: "Interactive visualization of how modern operating systems work.",
            resources_docs_title: "💻 Official Documentation",
            resources_doc1_title: "Microsoft Learn",
            resources_doc1_sub: "Windows Operating System",
            resources_doc1_desc: "Official Microsoft resources for learning about Windows.",
            resources_doc2_title: "Apple Developer Documentation",
            resources_doc2_sub: "macOS",
            resources_doc2_desc: "Comprehensive docs for macOS developers.",
            resources_doc3_title: "Linux Man Pages",
            resources_doc3_desc: "In-depth command and system documentation for Linux.",
            resources_videos_title: "🎬 Educational Videos",
            resources_video1_title: "YouTube - Crash Course Computer Science",
            resources_video1_desc: "Educational video series that explains OS concepts in an accessible way.",
            resources_video2_title: "YouTube - TechTalk Channels",
            resources_video2_desc: "Talks and lectures about OS evolution and design.",
            resources_tools_title: "📦 Tools and Software",
            resources_tool1_title: "VirtualBox",
            resources_tool1_desc: "Free software to run multiple OSes on the same machine — great for experimenting.",
            resources_tool2_title: "QEMU",
            resources_tool2_desc: "Powerful emulator for testing different OSes and architectures.",
            resources_tool3_title: "GDB (GNU Debugger)",
            resources_tool3_desc: "Low-level debugging tool useful for learning OS internals.",

            // Comparison (EN)
            comparison_th_feature: "Feature",
            comparison_th_windows: "Windows",
            comparison_th_macos: "macOS",
            comparison_th_linux: "Linux",
            comparison_th_ios: "iOS",
            comparison_th_android: "Android",
            comparison_feature_cost: "Cost",
            comparison_feature_open: "Open Source",
            comparison_feature_usability: "Usability",
            comparison_feature_security: "Security",
            comparison_feature_gaming: "Gaming",
            comparison_feature_professional: "Professional / Workstations",
            comparison_feature_servers: "Servers",
            comparison_feature_iot: "IoT & Embedded",
            comparison_feature_portability: "Portability",
            comparison_feature_market: "Market Share (Desktop)",
            comparison_feature_community: "Community",
            comp_paid: "Paid",
            comp_free: "Free",
            comp_yes: "Yes",
            comp_no: "No",
            comp_partial: "Partial",
            comp_good: "Good",
            comp_excellent: "Excellent",
            comp_rare: "Rare",
            comp_dominate: "Dominates",
            comp_popular: "Popular",
            comp_windows_only: "Windows only",
            comp_apple_only: "Apple only",
            comp_portable: "Portable",
            comp_multidevice: "Multi-device",
            comp_dash: "-",
            comp_very_large: "Very large",

            // Glossary (EN) - stats & filters
            glossary_stat_terms: "Terms",
            glossary_stat_categories: "Categories",
            glossary_stat_examples: "Code Examples",
            glossary_stat_interactive: "Interactive",
            glossary_filter_all: "All",
            glossary_filter_basic: "Basic",
            glossary_filter_advanced: "Advanced",
            glossary_filter_kernel: "Kernel",
            glossary_filter_memory: "Memory",
            glossary_filter_process: "Processes",
            glossary_filter_filesystem: "Filesystem",
            glossary_filter_security: "Security",
            
            // Resources page
            resources_title: "Resources and Reading",
            resources_subtitle: "Learn more about operating systems",
            
            // Quiz page
            quiz_title: "🎯 Quiz - Test Your Knowledge",
            quiz_subtitle: "How much do you know about operating systems?",
            quiz_start: "Start Quiz",
            quiz_next: "Next question",
            quiz_finish: "Finish",
            quiz_restart: "Restart Quiz",
            quiz_leaderboard: "🏅 Top 10 Players",
            quiz_add_current: "Add current result",
            quiz_start_title: "Ready to test your knowledge?",
            quiz_start_sub: "Click below to begin the quiz. Good luck!",
            quiz_results: "Your Results",
            quiz_score: "Score",
            quiz_correct: "Correct!",
            quiz_wrong: "Wrong!",
            quiz_achievements: "🏆 Achievements",
            quiz_achievement_unlocked: "Achievement Unlocked!",
            quiz_question: "Question",
            quiz_question_image_alt: "Question image",
            quiz_select_answer: "Please select an answer!",
            quiz_time_bonus: "Time bonus",
            quiz_total: "Total",
            quiz_points: "points",
            quiz_msg_perfect: "🏆 Perfect! You are an OS expert!",
            quiz_msg_excellent: "🎉 Excellent! You know OS very well!",
            quiz_msg_good: "👍 Good! You know the main concepts.",
            quiz_msg_study: "📚 You need to study more!",
            quiz_msg_retry: "💪 Come back and try again after studying!",
            quiz_leaderboard_prompt: "Enter your name for the leaderboard:",
            quiz_share_result: "📤 Share result",
            quiz_share_text: "I got {score} points ({percent}%) on the Evolution of Operating Systems quiz! 🎯⚡",
            quiz_achievements_label: "Achievements",
            quiz_leaderboard_label: "Leaderboard",
            quiz_bonus: "bonus",
            
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
            
            // OS cards (homepage)
            os_windows_title: "Windows",
            os_windows_desc: "The most used desktop OS. Developed by Microsoft.",
            os_macos_title: "macOS",
            os_macos_desc: "The operating system for Apple computers, known for stability and design.",
            os_linux_title: "Linux",
            os_linux_desc: "Open-source system widely used on servers and desktops.",
            os_android_title: "Android",
            os_android_desc: "Mobile operating system developed by Google, widely adopted.",
            os_ios_title: "iOS",
            os_ios_desc: "Operating system for iPhone and iPad, known for security and integration.",
            os_chrome_title: "ChromeOS",
            os_chrome_desc: "Operating system for Chromebooks, optimized for web apps and the cloud.",
            
            // Did you know
            dyk_title: "Did you know...?",
            
            // Misc
            read_more: "Read more",
            back_to_top: "Back to top",
            loading: "Loading...",
            error: "An error occurred",
            
            // =====================================================================
            // CHAPTER 1: The Beginnings of Operating Systems
            // =====================================================================
            ch1_title: "Chapter 1: The Beginnings of Operating Systems",
            ch1_subtitle: "Chapter 1: The Beginnings of Operating Systems",
            ch1_lead: "A fascinating journey into the dawn of the digital age — when revolutionary ideas took the form of the first computers",
            ch1_back: "← Back to History",
            
            // Intro
            ch1_intro: "Imagine a room the size of a gymnasium, filled with cables, light bulbs, and switches. This was the reality of the <span class=\"highlight\">1940s–1950s</span>, when humanity built the first <strong>electronic computers</strong>. There were no keyboards, monitors, or operating systems — just gigantic machines that had to be programmed manually, wire by wire, card by card.",
            
            // Section 1
            ch1_s1_title: "Extended Historical Context",
            ch1_s1_p1: "World War II dramatically accelerated the development of computing technology. The need to <strong>decrypt codes</strong> and calculate ballistic trajectories led to the creation of the first electronic computing machines.",
            ch1_s1_quote: "Computers of this era were not \"intelligent\" — they were just very fast at doing exactly what they were told, step by step.",
            ch1_s1_quote_cite: "— Fundamental principle of early computing",
            ch1_s1_p2: "Machines like <span class=\"key-term\">ENIAC</span> (Electronic Numerical Integrator and Computer) and <span class=\"key-term\">UNIVAC</span> (Universal Automatic Computer) occupied entire rooms and consumed as much power as a small factory. Programming was done by:",
            ch1_s1_li1: "<strong>Reconfiguring cables</strong> — operators physically connected circuits for each new program",
            ch1_s1_li2: "<strong>Punched cards</strong> — data and instructions represented by holes in special cardboard",
            ch1_s1_li3: "<strong>Control panels</strong> — switches and buttons for setting parameters",
            ch1_s1_li4: "<strong>Constant manual intervention</strong> — each step required direct human supervision",
            
            // Section 2
            ch1_s2_title: "Why Did This Era Matter?",
            ch1_s2_p1: "Although primitive by today's standards, these machines laid the foundation for the entire modern IT industry. The challenges faced by computing pioneers led to fundamental innovations:",
            ch1_s2_card1_title: "Automation",
            ch1_s2_card1_desc: "The need to reduce human intervention led to the first automatic control systems",
            ch1_s2_card2_title: "Hardware Management",
            ch1_s2_card2_desc: "Limited efficiency led to the development of resource management methods",
            ch1_s2_card3_title: "Control Systems",
            ch1_s2_card3_desc: "The first precursors of modern operating systems emerged from necessity",
            
            // Section 3
            ch1_s3_title: "Key Concepts of the Era",
            ch1_s3_p1: "To understand how the first computers worked, we need to know some fundamental concepts that defined this period:",
            ch1_s3_c1_title: "Punched Cards",
            ch1_s3_c1_desc: "Cardboard with strategically positioned holes, representing data and instructions. Each hole (or lack thereof) was a bit of information.",
            ch1_s3_c2_title: "Batch Processing",
            ch1_s3_c2_desc: "Programs (jobs) were grouped and executed sequentially, one after another, without real-time intervention.",
            ch1_s3_c3_title: "No Multitasking",
            ch1_s3_c3_desc: "Only one program ran at a time. The computer was completely dedicated to that task until completion.",
            ch1_s3_c4_title: "GM-NAA I/O",
            ch1_s3_c4_desc: "The first \"operating system\" (1956), developed for IBM 704. It automated the loading and execution of batch jobs.",
            
            // Section 4
            ch1_s4_title: "Examples and Representative Technologies",
            ch1_s4_p1: "Let's explore the most important machines that marked this founding era:",
            ch1_s4_t1_year: "1945",
            ch1_s4_t1_title: "ENIAC — Electronic Numerical Integrator and Computer",
            ch1_s4_t1_desc: "The first general-purpose electronic computer. It weighed 27 tons, occupied 167 m², and consumed 150 kW. It could perform 5,000 additions per second — revolutionary for that time. Programming took days and involved reconnecting thousands of cables.",
            ch1_s4_t2_year: "1951",
            ch1_s4_t2_title: "UNIVAC I — Universal Automatic Computer",
            ch1_s4_t2_desc: "The first mass-produced commercial computer. It correctly predicted the results of the 1952 U.S. presidential elections, demonstrating the potential of computers in data analysis. It used magnetic tape for storage, not just punched cards.",
            ch1_s4_t3_year: "1956",
            ch1_s4_t3_title: "IBM 704 with GM-NAA I/O",
            ch1_s4_t3_desc: "The first computer with a rudimentary operating system. GM-NAA I/O (developed by General Motors and North American Aviation) automated the transition between jobs, reducing wasted time between executions. This is considered the ancestor of all modern operating systems.",
            
            // Section 5
            ch1_s5_title: "Impact and Legacy",
            ch1_s5_p1: "The lessons learned in this primitive era shaped the entire subsequent evolution of computer science. Here are the main contributions that persist today:",
            ch1_s5_li1: "<strong>Job Scheduling Concept</strong> — The idea of organizing and prioritizing tasks is fundamental in any modern operating system, from Windows to Android.",
            ch1_s5_li2: "<strong>Hardware Abstraction</strong> — The first steps toward separating software from hardware, allowing programmers to write code without knowing the physical details of the machine.",
            ch1_s5_li3: "<strong>Automatic Processing</strong> — The transition from manual operation to automation paved the way for multitasking and real-time systems.",
            ch1_s5_li4: "<strong>Standardization</strong> — The need for compatibility led to the first standards and protocols in the computer industry.",
            ch1_s5_quote: "Every smartphone in our pocket is more powerful than all the computers from the 1950s combined — and this is the legacy of that era's pioneers.",
            
            // Section 6 - Media
            ch1_s6_title: "Interactive Experience and Media",
            ch1_s6_p1: "Visually explore this fascinating era through authentic images, documentary videos, and sound atmosphere. These resources will help you better understand the context and magnitude of achievements from that period.",
            ch1_s6_gallery: "📷 Historic Photo Gallery",
            ch1_s6_img1_title: "ENIAC (1945)",
            ch1_s6_img1_desc: "The first general-purpose electronic computer. Notice the enormous size and complexity of the wiring. The operators in the image are reconfiguring circuits for a new program.",
            ch1_s6_img2_title: "Hollerith Punched Card",
            ch1_s6_img2_desc: "The main data storage medium. Each hole represented a bit of information. A complex program required thousands of such cards, in precise order.",
            ch1_s6_img3_title: "IBM 704 (1959)",
            ch1_s6_img3_desc: "The computer on which GM-NAA I/O ran, the first operating system. Note the control panel and the operator monitoring the process.",
            ch1_s6_video: "🎬 Educational Documentary Video",
            ch1_s6_video_title: "Why this video?",
            ch1_s6_video_desc: "\"Computerland: The Visionaries\" (1992) — a documentary featuring segments with J. Presper Eckert, co-creator of ENIAC and UNIVAC. It provides an authentic perspective on the beginnings of the computer era.",
            ch1_s6_audio: "🎧 Sound Atmosphere (Optional)",
            ch1_s6_audio_title: "Computer Room Sounds (1950s)",
            ch1_s6_audio_subtitle: "Computer Room Ambience — Synthesized Simulation",
            ch1_s6_audio_status: "Click to generate and play the sound",
            ch1_s6_audio_desc: "<strong>Purpose:</strong> This audio generator recreates the atmosphere of a computer room from the 1950s — the sound of cooling fans, low frequencies of equipment, and characteristic electronic tones from that era. The sound is generated in real-time using Web Audio API, providing a historical immersion experience.",
            
            // Navigation
            ch1_nav_next: "Next Chapter: The Mainframe Era",
            
            // =====================================================================
            // CHAPTER 2: The Mainframe Era
            // =====================================================================
            ch2_title: "Chapter 2: The Mainframe Era",
            ch2_subtitle: "Chapter 2: The Mainframe Era",
            ch2_lead: "The industrial power of computers — batch processing, magnetic tapes, and the birth of data centers",
            ch2_back: "← Back to History",
            
            // Intro
            ch2_intro: "Imagine a gigantic hall, filled with metal cabinets humming rhythmically, magnetic tape reels spinning continuously, and operators in white coats feeding stacks of <span class=\"highlight\">punched cards</span>. This was the reality of the <strong>1950s–1960s</strong> — the <span class=\"key-tag\">mainframe</span> era, when computers became instruments of industrial power.",
            
            // Section 1
            ch2_s1_title: "Context: The Birth of Giants",
            ch2_s1_p1: "<strong>Mainframes</strong> were not simple computers — they were true <em>processing centers</em>, capable of handling enormous volumes of data for banks, governments, and corporations. These machines cost millions of dollars and required entire teams of operators, programmers, and engineers to function.",
            ch2_s1_quote: "A single mainframe could process more bank transactions in an hour than an army of accountants could in a month. This was the revolution.",
            ch2_s1_p2: "Access to these systems was strictly controlled. Users did not interact directly with the machine — they prepared <span class=\"key-tag\">jobs</span> on punched cards, submitted them to operators, then waited hours or even days for results.",
            
            // Section 2
            ch2_s2_title: "Why Did This Era Matter?",
            ch2_s2_p1: "The mainframe era transformed how society manages information. For the first time, organizations could process data at an <strong>industrial</strong> scale:",
            ch2_s2_meter1_label: "Centralization",
            ch2_s2_meter1_desc: "All data and processing in one controlled and secured location",
            ch2_s2_meter2_label: "Efficiency",
            ch2_s2_meter2_desc: "Automatic processing 24/7, without breaks or human errors",
            ch2_s2_meter3_label: "Security",
            ch2_s2_meter3_desc: "Controlled physical access, strict operating procedures",
            ch2_s2_li1: "<strong>Banks and finance</strong> — processing millions of daily transactions",
            ch2_s2_li2: "<strong>Governments</strong> — managing census and tax records",
            ch2_s2_li3: "<strong>Scientific research</strong> — complex calculations for physics and meteorology",
            ch2_s2_li4: "<strong>Airline industry</strong> — reservation systems (e.g., SABRE)",
            
            // Section 3
            ch2_s3_title: "Batch Processing — Processing in Lots",
            ch2_s3_p1: "<span class=\"key-tag\">Batch processing</span> was the innovation that made mainframes economically viable. Instead of each user running their program individually (which would waste precious time), jobs were <strong>grouped into batches</strong> and processed sequentially.",
            ch2_s3_def1_title: "Job Queue",
            ch2_s3_def1_desc: "Programs waited in an ordered queue. The system picked them up and executed them in order, without human intervention.",
            ch2_s3_def2_title: "Punched Cards",
            ch2_s3_def2_desc: "Each program was encoded on dozens or hundreds of cards. A dropped or shuffled card could destroy the entire execution.",
            ch2_s3_def3_title: "JCL — Job Control Language",
            ch2_s3_def3_desc: "A special language for describing jobs: what resources they need, what files they use, in what order steps are executed.",
            ch2_s3_pipeline_title: "🔄 Batch Processing Flow",
            ch2_s3_step1: "Preparation",
            ch2_s3_step1_desc: "Punched cards",
            ch2_s3_step2: "Queue",
            ch2_s3_step2_desc: "Job queue",
            ch2_s3_step3: "Execution",
            ch2_s3_step3_desc: "CPU processing",
            ch2_s3_step4: "Storage",
            ch2_s3_step4_desc: "Magnetic tape",
            ch2_s3_step5: "Output",
            ch2_s3_step5_desc: "Printed reports",
            
            // Section 4
            ch2_s4_title: "Multiprogramming — Multiple Programs Simultaneously",
            ch2_s4_p1: "Problem: when a program waited for data from magnetic tape (a slow operation), the processor sat <strong>idle</strong>. The solution? <span class=\"key-tag\">Multiprogramming</span>.",
            ch2_s4_quote: "The revolutionary idea: load multiple programs into memory simultaneously. When one waits for I/O, the processor switches to another. CPU utilization increases from ~30% to over 90%.",
            ch2_s4_p2: "Multiprogramming required fundamental innovations in operating system design:",
            ch2_s4_li1: "<strong>Memory protection</strong> — each program had its own zone, isolated from others",
            ch2_s4_li2: "<strong>Scheduling</strong> — algorithms to decide which program runs when",
            ch2_s4_li3: "<strong>Interrupt handling</strong> — mechanisms to pause and resume programs",
            ch2_s4_li4: "<strong>Spooling</strong> — buffering for slow devices (printers, card readers)",
            ch2_s4_p3: "These concepts underlie <strong>all</strong> modern operating systems — from Windows and Linux to iOS and Android.",
            
            // Section 5
            ch2_s5_title: "Examples and Representative Technologies",
            ch2_s5_p1: "Here are the defining technologies of the mainframe era, which shaped the industry for decades:",
            ch2_s5_card1_year: "1964",
            ch2_s5_card1_title: "IBM System/360",
            ch2_s5_card1_desc: "The architecture revolution: a <strong>family</strong> of compatible computers. Programs written for the small model ran on the large model. The first truly scalable platform in history.",
            ch2_s5_card2_year: "1961",
            ch2_s5_card2_title: "CTSS — Compatible Time-Sharing System",
            ch2_s5_card2_desc: "The first functional <strong>time-sharing</strong> system. It allowed multiple users to interact simultaneously with the same computer through terminals.",
            ch2_s5_card3_year: "1966",
            ch2_s5_card3_title: "OS/360",
            ch2_s5_card3_desc: "The operating system for System/360. One of the most complex software projects in history — it required thousands of programmers and years of development.",
            ch2_s5_card4_year: "1950s",
            ch2_s5_card4_title: "Magnetic Tapes",
            ch2_s5_card4_desc: "High-capacity sequential storage medium. Tape reels were the visual symbol of data centers. Some banking systems still use them today for backup.",
            
            // Section 6
            ch2_s6_title: "Impact and Legacy",
            ch2_s6_p1: "The mainframe era left a profound legacy that influences computing even today:",
            ch2_s6_li1: "<strong>Centralized administration</strong> — the concept of data centers, with strict access policies and backup procedures",
            ch2_s6_li2: "<strong>Planning and scheduling</strong> — prioritization algorithms that underlie modern task schedulers",
            ch2_s6_li3: "<strong>Logging and audit</strong> — systematic recording of operations for compliance and debugging",
            ch2_s6_li4: "<strong>Virtualization</strong> — IBM VM/370 (1972) introduced the concept of virtual machines, precursor to cloud computing",
            ch2_s6_li5: "<strong>Reliability</strong> — 99.999% uptime standards (\"five nines\") come from mainframe era banking requirements",
            ch2_s6_quote: "Surprisingly: many banks and airlines still run COBOL software on modern mainframes. IBM produces and sells mainframes in 2026.",
            
            // Section 7 - Media
            ch2_s7_title: "Mainframe Experience — Interactive Media",
            ch2_s7_p1: "Visually explore the world of mainframes through archive images, educational video, and authentic sound atmosphere. These resources will transport you to the data centers of the 1960s.",
            ch2_s7_gallery: "📷 Photo Gallery: Historic Data Centers",
            ch2_s7_img1_title: "IBM System/360 Model 30",
            ch2_s7_img1_desc: "The operating console of a System/360. Notice the control panel with LEDs and switches — the operator's main interface with the machine.",
            ch2_s7_img2_title: "IBM System/360 Model 40",
            ch2_s7_img2_desc: "Overview of a data center. Note the magnetic tape units in the background and the impressive size of the equipment.",
            ch2_s7_img3_title: "Complete System/360 Installation",
            ch2_s7_img3_desc: "A typical data center of the 1960s. False floors hid kilometers of cables, and air conditioning was essential for cooling components.",
            ch2_s7_video: "🎬 Educational Video: How a Mainframe Worked",
            ch2_s7_video_title: "What to observe in this video",
            ch2_s7_video_desc: "This documentary includes segments about the evolution of computers from ENIAC to the mainframe era. Watch interviews with industry pioneers and authentic images from data centers of the 60s-70s. Notice the size of the equipment and the complexity of their operation.",
            ch2_s7_audio: "🎧 Sound Atmosphere: Vintage Data Center (Optional)",
            ch2_s7_audio_title: "Data Center Sounds (1960s)",
            ch2_s7_audio_subtitle: "Mainframe Room Ambience — Simulation",
            ch2_s7_audio_status: "Click to generate and play the sound",
            ch2_s7_audio_desc: "<strong>Purpose:</strong> This audio generator recreates the atmosphere of a data center from the mainframe era — the constant rhythm of tape units, the hum of transformers, and periodic clicks of equipment. The sound is generated in-browser for an authentic immersion experience.",
            
            // Navigation
            ch2_nav_prev: "Chapter 1: The Beginnings",
            ch2_nav_next: "Chapter 3: The Birth of Unix",

            // =====================================================================
            // CHAPTER 3: The Birth of Unix
            // =====================================================================
            ch3_title: "Chapter 3: The Birth of Unix",
            ch3_subtitle: "Chapter 3: The Birth of Unix",
            ch3_lead: "Bell Labs, the C language, and the philosophy that made Unix portable and elegant",
            ch3_back: "← Back to History",
            ch3_intro: "Imagine a modest lab in Murray Hill, New Jersey — a handful of researchers, a <span class='highlight'>PDP-7</span> computer already considered obsolete, and one simple idea: an operating system that does <strong>little, but does it well</strong>. This is the birth of Unix — the project that forever redefined how we think about software.",

            // Section 1: Context
            ch3_s1_title: "Context: From Multics to Unix",
            ch3_s1_p1: "By the late <strong>1960s</strong>, <span class='key-tag'>Bell Labs</span> (part of AT&T) was one of the most prestigious research laboratories in the world. Computer science, telecommunications, and mathematics intersected here, and small teams of researchers had the freedom to explore ambitious ideas.",
            ch3_s1_quote: "Multics was a grand dream. Unix was the practical reaction — proof that simplicity can be more powerful than complexity.",
            ch3_s1_quote_cite: "— Reflection on Bell Labs philosophy",
            ch3_s1_p2: "Bell Labs had participated in the <span class='key-tag'>Multics</span> (Multiplexed Information and Computing Service) project — an ambitious time-sharing system developed alongside MIT and GE. Though innovative, Multics had become too complex and expensive. When Bell Labs withdrew from the project in 1969, two researchers decided to start from scratch:",
            ch3_s1_li1: "<strong>Ken Thompson</strong> — wrote the first version of Unix on a PDP-7 in just a few weeks, partly motivated by wanting to play a game (Space Travel)",
            ch3_s1_li2: "<strong>Dennis Ritchie</strong> — created the C language specifically to rewrite Unix portably, eliminating dependence on assembly language",
            ch3_s1_li3: "<strong>Brian Kernighan</strong> — coined the name \"Unix\" (a play on Multics: \"uni\" vs. \"multi\") and contributed to the classic documentation",
            ch3_s1_li4: "<strong>PDP-7, then PDP-11</strong> — the modest hardware on which Unix was refined, proving that a powerful OS doesn't require expensive machines",

            // Section 2: Why Unix appeared
            ch3_s2_title: "Why Did Unix Appear?",
            ch3_s2_p1: "Unix was not a corporate-planned project. It was created by programmers <strong>for programmers</strong>, in response to real frustrations with existing systems:",
            ch3_s2_meter1_label: "Simplicity",
            ch3_s2_meter1_desc: "Reaction to Multics complexity — every component had to be minimal and clear",
            ch3_s2_meter2_label: "Portability",
            ch3_s2_meter2_desc: "Written in C, not assembly — could be moved to any hardware architecture",
            ch3_s2_meter3_label: "Collaboration",
            ch3_s2_meter3_desc: "Distributed free to universities, creating the first open-source community",
            ch3_s2_p2: "Efficient time-sharing, reusable tools, and multi-user support made Unix perfect for academia. AT&T couldn't sell software (due to an antitrust agreement), so Unix was distributed to universities nearly for free — a decision that enormously accelerated its adoption.",

            // Section 3: Unix Philosophy
            ch3_s3_title: "The Unix Philosophy — \"Do One Thing Well\"",
            ch3_s3_p1: "Unix wasn't just an operating system — it was a <strong>design philosophy</strong>. Instead of monolithic programs that do everything, Unix promoted small, specialized components that combine elegantly:",
            ch3_s3_c1_title: "Do One Thing Well",
            ch3_s3_c1_desc: "Each program should do one task, but do it perfectly. grep searches text. sort sorts. wc counts.",
            ch3_s3_c2_title: "Compose with Pipes",
            ch3_s3_c2_desc: "One program's output becomes another's input via the | operator. Infinite combinations from simple pieces.",
            ch3_s3_c3_title: "Everything Is a File",
            ch3_s3_c3_desc: "Devices, processes, sockets — all accessed as files. One uniform interface for everything.",
            ch3_s3_c4_title: "Text as Universal Format",
            ch3_s3_c4_desc: "Data flows as plain text between programs. Anyone can inspect, filter, and transform the data stream.",
            ch3_s3_c5_title: "Scripting & Automation",
            ch3_s3_c5_desc: "The shell isn't just an interface — it's a programming language. Any sequence of commands becomes a reusable script.",
            ch3_s3_pipe_title: "$ cat /var/log/access.log | grep \"ERROR\" | sort | uniq -c | head -10",
            ch3_s3_step1: "cat",
            ch3_s3_step1_desc: "Reads the file",
            ch3_s3_step2: "grep",
            ch3_s3_step2_desc: "Filters lines",
            ch3_s3_step3: "sort",
            ch3_s3_step3_desc: "Sorts them",
            ch3_s3_step4: "uniq -c",
            ch3_s3_step4_desc: "Counts unique",
            ch3_s3_step5: "head",
            ch3_s3_step5_desc: "Top 10 results",

            // Section 4: Technical Characteristics
            ch3_s4_title: "Architecture & Technical Characteristics",
            ch3_s4_p1: "Writing the kernel in <span class='key-tag'>the C language</span> (developed by Ritchie specifically for this purpose) was the decision that changed everything. For the first time, an operating system could be <strong>ported</strong> to different hardware by simply recompiling.",
            ch3_s4_def1_title: "Multi-User & Time-Sharing",
            ch3_s4_def1_desc: "Multiple users connected simultaneously via terminals, each with their own permissions and isolated session.",
            ch3_s4_def2_title: "Preemptive Multitasking",
            ch3_s4_def2_desc: "The kernel decides when to switch between processes. No program can monopolize the CPU — fairness guaranteed.",
            ch3_s4_def3_title: "Hierarchical File System",
            ch3_s4_def3_desc: "Tree-like directory structure (/, /usr, /etc, /home) — the model copied by all modern operating systems.",
            ch3_s4_def4_title: "Processes & Signals",
            ch3_s4_def4_desc: "Every program runs as a process with a unique PID. Signals (SIGTERM, SIGKILL) allow fine-grained control of execution.",
            ch3_s4_quote: "Unix proved that an operating system doesn't need to be large to be powerful. The original kernel had fewer than 10,000 lines of code.",
            ch3_s4_quote_cite: "— On the elegant simplicity of Unix",

            // Section 5: Examples & Technologies
            ch3_s5_title: "Representative Examples & Technologies",
            ch3_s5_p1: "From the Unix ecosystem emerged technologies and tools that form the foundation of modern computing. Here are the most important:",
            ch3_s5_card1_year: "1969",
            ch3_s5_card1_title: "PDP-7 → PDP-11",
            ch3_s5_card1_desc: "Ken Thompson wrote the first Unix version on a <strong>PDP-7</strong> in assembly language. Migration to PDP-11 (1970) and rewriting in C (1973) established the model: a portable, compact, and powerful OS.",
            ch3_s5_card2_year: "1972",
            ch3_s5_card2_title: "The C Language",
            ch3_s5_card2_desc: "Dennis Ritchie created C, evolving from B (Thompson). It combined <strong>low-level control</strong> of assembly with the productivity of a high-level language. The Unix kernel rewritten in C was ~95% portable code.",
            ch3_s5_card3_year: "1970s",
            ch3_s5_card3_title: "grep, sed, awk & Tools",
            ch3_s5_card3_desc: "The Unix text utility suite: <strong>grep</strong> (pattern search), <strong>sed</strong> (stream editing), <strong>awk</strong> (tabular processing). These tools are used daily by millions of developers even in 2026.",
            ch3_s5_card4_year: "1977–1983",
            ch3_s5_card4_title: "BSD & System V",
            ch3_s5_card4_desc: "Unix branched: <strong>BSD</strong> (Berkeley Software Distribution) added TCP/IP networking, while <strong>System V</strong> (AT&T) defined commercial standards. Both branches influenced all subsequent operating systems.",

            // Section 6: Impact
            ch3_s6_title: "Impact & Legacy",
            ch3_s6_p1: "Unix redefined how we think about software. Its legacy is present in every corner of the modern digital world:",
            ch3_s6_li1: "<strong>Linux</strong> — Linus Torvalds created Linux (1991) directly inspired by Unix. Today, Linux runs on ~96% of web servers, in Android phones, and on the top 500 supercomputers.",
            ch3_s6_li2: "<strong>macOS & iOS</strong> — Apple built macOS on a BSD/NeXTSTEP foundation, making every Mac and iPhone a direct descendant of Unix.",
            ch3_s6_li3: "<strong>POSIX & Standards</strong> — The POSIX standard ensures compatibility between Unix-like implementations, from AIX to FreeBSD.",
            ch3_s6_li4: "<strong>DevOps & Cloud</strong> — Docker containers, Kubernetes, CI/CD pipelines — all built on Unix principles: modularity, composition, automation.",
            ch3_s6_li5: "<strong>Open Source Culture</strong> — Distributing Unix to universities created the first model of collaborative software, precursor to the modern open-source movement.",
            ch3_s6_quote: "Every terminal you open, every command you type in Linux or macOS — you're just one keystroke away from the spirit of Thompson and Ritchie from 1969.",

            // Section 7: Media
            ch3_s7_title: "Unix Experience — Interactive Media",
            ch3_s7_p1: "Explore the world of Unix visually through archive photos from Bell Labs, educational video, an interactive demonstration terminal, and period ambient sound.",
            ch3_s7_gallery: "📷 Photo Gallery: Bell Labs and the Unix Pioneers",
            ch3_s7_img1_title: "Thompson & Ritchie (1973)",
            ch3_s7_img1_desc: "Ken Thompson (left) and Dennis Ritchie (right) at a PDP-11 terminal in Bell Labs — the defining moment of Unix creation.",
            ch3_s7_img2_title: "DEC PDP-11/40",
            ch3_s7_img2_desc: "The minicomputer on which Unix was refined and rewritten in C. With modest resources, it proved that a powerful OS doesn't require expensive hardware.",
            ch3_s7_img3_title: "DEC PDP Racks",
            ch3_s7_img3_desc: "DEC racks and consoles — the typical environment where Bell Labs researchers worked with early Unix versions through text terminals.",
            ch3_s7_video: "🎬 Educational Video: The Unix Story",
            ch3_s7_video_title: "Why this video?",
            ch3_s7_video_desc: "\"AT&T Archives: The UNIX Operating System\" — a film from the AT&T archives presenting Unix directly from its creators' perspective. Includes demonstrations of pipes, the shell, and the design philosophy that revolutionized the industry.",
            ch3_s7_terminal_heading: "💻 Unix Demonstration Terminal",
            ch3_term_comment1: "# Who are we and where are we?",
            ch3_term_comment2: "# List the directory structure",
            ch3_term_comment3: "# The power of pipes: combining commands",
            ch3_s7_audio: "🎧 Sound Ambience: Terminal Room (Optional)",
            ch3_s7_audio_title: "Sounds of a Terminal Room (1970s)",
            ch3_s7_audio_subtitle: "Unix Terminal Ambience — Synthesized Simulation",
            ch3_s7_audio_status: "Click to generate and play the sound",
            ch3_s7_audio_desc: "<strong>Purpose:</strong> This audio generator recreates the atmosphere of a 1970s terminal room — fan noise, rhythmic teletype keyboard clicks, characteristic modem tones, and the constant hum of minicomputers. Sound is generated in real-time using the Web Audio API.",

            // Navigation
            ch3_nav_prev: "Chapter 2: The Mainframe Era",
            ch3_nav_next: "Chapter 4: The PC Era",

            // =====================================================================
            // CHAPTER 4: The PC and GUI Era
            // =====================================================================
            ch4_title: "Chapter 4: The PC and GUI Era",
            ch4_subtitle: "Chapter 4: The PC and GUI Era",
            ch4_lead: "MS-DOS, Macintosh, and the revolution that turned the computer from a professional tool into an everyday companion",
            ch4_back: "← Back to History",
            ch4_intro: "Imagine an office in the <span class='highlight'>1980s</span>: a small screen, a bulky keyboard, and a green cursor blinking on a black background. Then, one day, something new appears — a <strong>window</strong>, an <strong>icon</strong>, a <strong>mouse</strong>. The computer no longer speaks only the language of programmers. This is the moment when technology began to be for <em>everyone</em>.",

            // Section 1: Historical Context
            ch4_s1_title: "Historical Context",
            ch4_s1_p1: "In the early <strong>1980s</strong>, computers were still specialized instruments. Mainframes dominated corporations, and minicomputers were in universities. But a tectonic shift was about to occur: the <span class='gui-tag'>personal computer</span> (PC) was going to bring computing power to every person's desk.",
            ch4_s1_quote: "The personal computer was the most democratizing invention in the history of technology. It took computing power from institutions and gave it to the individual.",
            ch4_s1_quote_cite: "— Reflection on the PC revolution",
            ch4_s1_p2: "The key events that paved the way for the PC era were:",
            ch4_s1_li1: "<strong>1975 — Altair 8800</strong> — the first commercial microcomputer, sold as a kit. It inspired a generation of enthusiasts, including Bill Gates and Paul Allen.",
            ch4_s1_li2: "<strong>1977 — Apple II, Commodore PET, TRS-80</strong> — the \"trinity\" of personal computers. Apple II was the first with color graphics and sound.",
            ch4_s1_li3: "<strong>1981 — IBM PC</strong> — the launch that legitimized the personal computer market. Its open architecture created a huge ecosystem of compatible clones.",
            ch4_s1_li4: "<strong>1984 — Apple Macintosh</strong> — the first mass-marketed computer with an integrated graphical interface, mouse, and the \"desktop\" metaphor.",

            // Section 2: Why Was the PC Important?
            ch4_s2_title: "Why Was the PC Important?",
            ch4_s2_p1: "Before the PC, computers were the exclusive domain of specialists. The PC radically changed this paradigm, bringing computers into homes, schools, and small offices:",
            ch4_s2_meter1_label: "Accessibility",
            ch4_s2_meter1_desc: "The price of a PC dropped from millions of dollars (mainframe) to a few thousand — affordable for families and small businesses",
            ch4_s2_meter2_label: "Independence",
            ch4_s2_meter2_desc: "Users no longer depended on a central IT department — they had their own computer, with their own programs",
            ch4_s2_meter3_label: "Productivity",
            ch4_s2_meter3_desc: "Word processors, spreadsheets, and databases transformed the way the world works",
            ch4_s2_li1: "<strong>Education</strong> — children started learning programming and using computers in schools",
            ch4_s2_li2: "<strong>Small businesses</strong> — entrepreneurs could manage accounting and correspondence digitally",
            ch4_s2_li3: "<strong>Creativity</strong> — desktop publishing, digital music, and the first home video games",
            ch4_s2_li4: "<strong>Communication</strong> — BBSes (Bulletin Board Systems) and the first inter-computer communication networks",

            // Section 3: From CLI to GUI
            ch4_s3_title: "From CLI to GUI — The Visual Revolution",
            ch4_s3_p1: "Early PC systems, like <span class='gui-tag'>MS-DOS</span>, used a <strong>command-line interface</strong> (CLI). Users had to memorize exact text commands to perform any operation, from copying a file to launching a program.",
            ch4_s3_quote: "CLI: enormous power, but a high entry barrier. GUI: less fine control, but accessible to everyone. This was the defining debate of the '80s.",
            ch4_s3_p2: "The revolutionary concept was <span class='gui-tag'>WIMP</span> — an acronym that defines the GUI paradigm:",
            ch4_s3_c1_title: "W — Windows",
            ch4_s3_c1_desc: "Each program runs in a separate visual area (window) that can be moved, resized, minimized, or maximized. Multiple windows can be visible simultaneously.",
            ch4_s3_c2_title: "I — Icons",
            ch4_s3_c2_desc: "Visual representations of files, folders, and programs. Instead of typing \"del report.txt\", you drag the icon to the trash can.",
            ch4_s3_c3_title: "M — Menus",
            ch4_s3_c3_desc: "Organized lists of available commands, grouped logically (File, Edit, View). No need to memorize — just choose from a list.",
            ch4_s3_c4_title: "P — Pointer (Mouse)",
            ch4_s3_c4_desc: "The pointing device (mouse) enables direct interaction with screen elements — click, drag, drop. Your hand becomes an extension of your mind on screen.",
            ch4_s3_p3: "This transition was not merely cosmetic — it was a <strong>cognitive revolution</strong>. GUI drastically reduced the learning curve, allowing millions of people without technical training to use computers productively.",

            // Section 4: OS Examples
            ch4_s4_title: "Operating System Examples",
            ch4_s4_p1: "The PC era produced a series of operating systems that defined how we interact with computers:",
            ch4_s4_card1_year: "1981",
            ch4_s4_card1_title: "MS-DOS — Microsoft Disk Operating System",
            ch4_s4_card1_desc: "Pure CLI interface. Text commands for all operations. <strong>Fast and efficient</strong>, but difficult for beginners. It dominated the PC market for a decade and laid the foundation of the Microsoft empire.",
            ch4_s4_card2_year: "1984",
            ch4_s4_card2_title: "Apple Macintosh — System 1",
            ch4_s4_card2_desc: "The first commercial computer with an <strong>integrated GUI</strong> and included mouse. The desktop metaphor (files, folders, trash) became a worldwide standard. Inspired by Xerox PARC research.",
            ch4_s4_card3_year: "1985–1990",
            ch4_s4_card3_title: "Windows 1.0 → 3.1",
            ch4_s4_card3_desc: "Microsoft brought <strong>GUI to the DOS platform</strong>. Windows 1.0 was modest, but Windows 3.1 (1992) was a massive success — overlapping windows, Program Manager, and multimedia support.",
            ch4_s4_card4_year: "1995",
            ch4_s4_card4_title: "Windows 95",
            ch4_s4_card4_desc: "The turning point. <strong>Start button, taskbar, Explorer</strong> — the paradigm that still defines Windows today. It sold 7 million copies in the first 5 weeks. It made GUI the PC standard.",

            // Section 5: User Impact
            ch4_s5_title: "Impact on Users",
            ch4_s5_p1: "The transition to GUI transformed the human-computer relationship. Advanced technical knowledge was no longer necessary — the visual interface opened a new world:",
            ch4_s5_li1: "<strong>Drastically reduced learning curve</strong> — anyone could learn to use a Mac or Windows in a few hours, not weeks",
            ch4_s5_li2: "<strong>Familiar metaphors</strong> — desktop, folder, trash — concepts already known from the physical world",
            ch4_s5_li3: "<strong>Visual multitasking</strong> — users could see and switch between multiple programs simultaneously through windows",
            ch4_s5_li4: "<strong>Accessibility</strong> — people with disabilities benefited from visual interfaces, zoom, screen readers, and alternative input",
            ch4_s5_li5: "<strong>Digital creativity</strong> — desktop publishing (PageMaker, 1985), photo editing, music — GUI opened up digital art",
            ch4_s5_quote: "GUI didn't make the computer more powerful — it made it more human. It transformed a calculating machine into a tool of expression.",

            // Section 6: Legacy
            ch4_s6_title: "Impact and Legacy",
            ch4_s6_p1: "The PC and GUI revolution left a legacy that defines today's digital world:",
            ch4_s6_li1: "<strong>WIMP Paradigm</strong> — Windows, Icons, Menus, Pointer — remains the foundation of desktop interaction in 2026, from Windows 11 to macOS and Linux",
            ch4_s6_li2: "<strong>Standardization</strong> — GUI conventions (double-click, drag & drop, Ctrl+C/Ctrl+V) are universal and intuitive",
            ch4_s6_li3: "<strong>Software industry</strong> — the PC created the commercial software market: word processors, spreadsheets, databases, games",
            ch4_s6_li4: "<strong>Internet and web</strong> — GUI made the visual web browser possible (Mosaic, Netscape), opening the internet era for everyone",
            ch4_s6_li5: "<strong>Mobile and touch</strong> — the GUI paradigm evolved into touch interfaces (iPhone, 2007), gesture-based and voice UI — but the core principles remain the same",
            ch4_s6_quote: "Every window you open, every icon you click, every menu you explore — you are the direct heir of the visionaries at Xerox PARC, Apple, and Microsoft in the '80s.",

            // Section 7: Media
            ch4_s7_title: "GUI Experience — Media and Visualization",
            ch4_s7_p1: "Visually explore the GUI revolution through historic images, educational video, and an interactive mockup demonstrating graphical interface concepts.",
            ch4_s7_gallery: "📷 Photo Gallery: The GUI Revolution",
            ch4_s7_img1_title: "Apple Macintosh (1984)",
            ch4_s7_img1_desc: "The original Macintosh System 1 interface. Notice the desktop metaphor: icons, windows, menus, and trash. This revolutionary paradigm still defines how we use computers.",
            ch4_s7_img2_title: "Windows 3.1 (1992)",
            ch4_s7_img2_desc: "Program Manager in Windows 3.1 — Microsoft's first major GUI success. Overlapping windows, program icons, and multimedia support brought GUI to hundreds of millions of PC users.",
            ch4_s7_img3_title: "Xerox Alto & Mouse (1973)",
            ch4_s7_img3_desc: "Xerox Alto — the experimental workstation at Xerox PARC that invented the modern GUI concept. The mouse, windows, and menus were prototyped here a decade before the Macintosh.",
            ch4_s7_video: "🎬 Educational Video: GUI Evolution",
            ch4_s7_video_title: "What to observe in this video",
            ch4_s7_video_desc: "The original Apple Macintosh presentation from 1984 — the historic moment when Steve Jobs publicly demonstrated the graphical interface for the masses. Notice the audience reaction to drag & drop, menus, and windows — trivial today, revolutionary then.",
            ch4_s7_mockup_title: "🖥️ Interactive Mockup: What an Early GUI Looked Like",
            ch4_s7_mockup_desc: "This mockup visually demonstrates the fundamental elements of a graphical interface — the windows, icons, menus, and buttons that defined the GUI paradigm.",

            // Navigation
            ch4_nav_prev: "Chapter 3: The Birth of Unix",
            ch4_nav_next: "Chapter 5: Linux and Open Source"
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
                // Pentru alte elemente, actualizează innerHTML (pentru a păstra formatarea HTML)
                el.innerHTML = translation;
            }
        });

        // Translate related-tag elements (small inline links/tags inside glossary)
        // Map common visible words (RO/EN) to i18n keys so we don't have to annotate every span.
        const relatedMap = {
            // Kernel / process / driver
            'Driver': 'gl_driver_title', 'Driver': 'gl_driver_title',
            'Proces': 'gl_process_title', 'Process': 'gl_process_title',
            'System Call': 'gl_syscall_title', 'System call': 'gl_syscall_title',
            'Kernel': 'gl_kernel_title',
            'Privilegii': 'gl_privileges_title', 'Privileges': 'gl_privileges_title',
            'API': 'gl_api_title',

            // Interrupt / I/O / BIOS / UEFI
            'Interrupt': 'gl_interrupt_title', 'I/O': 'gl_io_title', 'IO': 'gl_io_title',
            'BIOS': 'gl_bios_title', 'UEFI': 'gl_uefi_title', 'Bootloader': 'gl_bootloader_title',
            'ROM': 'gl_rom_title', 'Secure Boot': 'gl_secure_boot_title',

            // Threads / scheduling
            'Thread': 'gl_thread_title', 'Scheduler': 'gl_scheduler_title',
            'Context Switching': 'gl_context_switching_title',

            // Synchronization / errors
            'Mutex': 'gl_mutex_title', 'Semaphor': 'gl_semaphore_title', 'Semafor': 'gl_semaphore_title',
            'Deadlock': 'gl_deadlock_title', 'Race Condition': 'gl_race_title',

            // Memory & CPU
            'Virtual Memory': 'gl_vmem_title', 'Cache': 'gl_cache_title', 'Page Fault': 'gl_page_fault_title', 'MMU': 'gl_mmu_title',
            'RAM': 'gl_ram_title', 'CPU': 'gl_cpu_title',

            // Filesystem related
            'Inode': 'gl_inode_title', 'Partiție': 'gl_partition_title', 'Partitie': 'gl_partition_title', 'Parti?ie': 'gl_partition_title',
            'Mount': 'gl_mount_title', 'File System': 'gl_filesystem_title', 'Hard Link': 'gl_hardlink_title',

            // Shell / CLI
            'CLI': 'gl_cli_title', 'Shell': 'gl_shell_title', 'Terminal': 'gl_terminal_title',

            // DMA / POSIX / Unix
            'DMA': 'gl_dma_title', 'POSIX': 'gl_posix_title', 'Unix': 'gl_unix_title',

            // Misc
            'Root': 'gl_root_title'
        };

        document.querySelectorAll('.related-tag').forEach(el => {
            const txt = el.textContent.trim();
            const key = relatedMap[txt];
            if (key) {
                const tr = t(key);
                if (tr && tr !== key) el.textContent = tr;
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
