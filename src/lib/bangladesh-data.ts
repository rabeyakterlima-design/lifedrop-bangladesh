export interface Upazila {
  id: string;
  name: string;
  bnName: string;
}

export interface District {
  id: string;
  name: string;
  bnName: string;
  divisionId: string;
  upazilas: Upazila[];
}

export interface Division {
  id: string;
  name: string;
  bnName: string;
}

export const DIVISIONS: Division[] = [
  { id: "dhaka", name: "Dhaka", bnName: "ঢাকা" },
  { id: "chattogram", name: "Chattogram", bnName: "চট্টগ্রাম" },
  { id: "rajshahi", name: "Rajshahi", bnName: "রাজশাহী" },
  { id: "khulna", name: "Khulna", bnName: "খুলনা" },
  { id: "barishal", name: "Barishal", bnName: "বরিশাল" },
  { id: "sylhet", name: "Sylhet", bnName: "সিলেট" },
  { id: "rangpur", name: "Rangpur", bnName: "রংপুর" },
  { id: "mymensingh", name: "Mymensingh", bnName: "ময়মনসিংহ" },
];

export const DISTRICTS: District[] = [
  // Dhaka Division
  {
    id: "dhaka",
    name: "Dhaka",
    bnName: "ঢাকা",
    divisionId: "dhaka",
    upazilas: [
      { id: "dhanmondi", name: "Dhanmondi", bnName: "ধানমন্ডি" },
      { id: "mirpur", name: "Mirpur", bnName: "মিরপুর" },
      { id: "uttara", name: "Uttara", bnName: "উত্তরা" },
      { id: "gulshan", name: "Gulshan", bnName: "গুলশান" },
      { id: "banani", name: "Banani", bnName: "বনানী" },
      { id: "motijheel", name: "Motijheel", bnName: "মতিঝিল" },
      { id: "mohammadpur", name: "Mohammadpur", bnName: "মোহাম্মদপুর" },
      { id: "savar", name: "Savar", bnName: "সাভার" },
      { id: "dhamrai", name: "Dhamrai", bnName: "ধামরাই" },
      { id: "keraniganj", name: "Keraniganj", bnName: "কেরানীগঞ্জ" },
      { id: "badda", name: "Badda", bnName: "বাড্ডা" },
      { id: "shahbagh", name: "Shahbagh", bnName: "শাহবাগ" },
    ],
  },
  {
    id: "gazipur",
    name: "Gazipur",
    bnName: "গাজীপুর",
    divisionId: "dhaka",
    upazilas: [
      { id: "gazipur-sadar", name: "Gazipur Sadar", bnName: "গাজীপুর সদর" },
      { id: "kaliakair", name: "Kaliakair", bnName: "কালিয়াকৈর" },
      { id: "kapasia", name: "Kapasia", bnName: "কাপাসিয়া" },
      { id: "sreepur", name: "Sreepur", bnName: "শ্রীপুর" },
      { id: "kaliganj-g", name: "Kaliganj", bnName: "কালীগঞ্জ" },
    ],
  },
  {
    id: "narayanganj",
    name: "Narayanganj",
    bnName: "নারায়ণগঞ্জ",
    divisionId: "dhaka",
    upazilas: [
      { id: "narayanganj-sadar", name: "Narayanganj Sadar", bnName: "নারায়ণগঞ্জ সদর" },
      { id: "bandar", name: "Bandar", bnName: "বন্দর" },
      { id: "rupganj", name: "Rupganj", bnName: "রূপগঞ্জ" },
      { id: "sonargaon", name: "Sonargaon", bnName: "সোনারগাঁ" },
      { id: "araihazar", name: "Araihazar", bnName: "আড়াইহাজার" },
    ],
  },
  {
    id: "tangail",
    name: "Tangail",
    bnName: "টাঙ্গাইল",
    divisionId: "dhaka",
    upazilas: [
      { id: "tangail-sadar", name: "Tangail Sadar", bnName: "টাঙ্গাইল সদর" },
      { id: "mirzapur", name: "Mirzapur", bnName: "মির্জাপুর" },
      { id: "madhupur", name: "Madhupur", bnName: "মধুপুর" },
      { id: "ghatail", name: "Ghatail", bnName: "ঘাটাইল" },
    ],
  },
  {
    id: "faridpur",
    name: "Faridpur",
    bnName: "ফরিদপুর",
    divisionId: "dhaka",
    upazilas: [
      { id: "faridpur-sadar", name: "Faridpur Sadar", bnName: "ফরিদপুর সদর" },
      { id: "boalmari", name: "Boalmari", bnName: "বোয়ালমারী" },
      { id: "bhanga", name: "Bhanga", bnName: "ভাঙ্গা" },
    ],
  },
  {
    id: "kishoreganj",
    name: "Kishoreganj",
    bnName: "কিশোরগঞ্জ",
    divisionId: "dhaka",
    upazilas: [
      { id: "kishoreganj-sadar", name: "Kishoreganj Sadar", bnName: "কিশোরগঞ্জ সদর" },
      { id: "bhairab", name: "Bhairab", bnName: "ভৈরব" },
      { id: "bajitpur", name: "Bajitpur", bnName: "বাজিতপুর" },
    ],
  },
  {
    id: "manikganj",
    name: "Manikganj",
    bnName: "মানিকগঞ্জ",
    divisionId: "dhaka",
    upazilas: [
      { id: "manikganj-sadar", name: "Manikganj Sadar", bnName: "মানিকগঞ্জ সদর" },
      { id: "singair", name: "Singair", bnName: "সিংগাইর" },
    ],
  },
  {
    id: "munshiganj",
    name: "Munshiganj",
    bnName: "মুন্সীগঞ্জ",
    divisionId: "dhaka",
    upazilas: [
      { id: "munshiganj-sadar", name: "Munshiganj Sadar", bnName: "মুন্সীগঞ্জ সদর" },
      { id: "sreenagar", name: "Sreenagar", bnName: "শ্রীনগর" },
    ],
  },
  {
    id: "narsingdi",
    name: "Narsingdi",
    bnName: "নরসিংদী",
    divisionId: "dhaka",
    upazilas: [
      { id: "narsingdi-sadar", name: "Narsingdi Sadar", bnName: "নরসিংদী সদর" },
      { id: "shibpur", name: "Shibpur", bnName: "শিবপুর" },
    ],
  },
  {
    id: "gopalganj",
    name: "Gopalganj",
    bnName: "গোপালগঞ্জ",
    divisionId: "dhaka",
    upazilas: [
      { id: "gopalganj-sadar", name: "Gopalganj Sadar", bnName: "গোপালগঞ্জ সদর" },
      { id: "tungipara", name: "Tungipara", bnName: "টুঙ্গিপাড়া" },
    ],
  },
  {
    id: "madaripur",
    name: "Madaripur",
    bnName: "মাদারীপুর",
    divisionId: "dhaka",
    upazilas: [
      { id: "madaripur-sadar", name: "Madaripur Sadar", bnName: "মাদারীপুর সদর" },
      { id: "shibchar", name: "Shibchar", bnName: "শিবচর" },
    ],
  },
  {
    id: "rajbari",
    name: "Rajbari",
    bnName: "রাজবাড়ী",
    divisionId: "dhaka",
    upazilas: [
      { id: "rajbari-sadar", name: "Rajbari Sadar", bnName: "রাজবাড়ী সদর" },
      { id: "pangsha", name: "Pangsha", bnName: "পাংশা" },
    ],
  },
  {
    id: "shariatpur",
    name: "Shariatpur",
    bnName: "শরীয়তপুর",
    divisionId: "dhaka",
    upazilas: [
      { id: "shariatpur-sadar", name: "Shariatpur Sadar", bnName: "শরীয়তপুর সদর" },
      { id: "damudya", name: "Damudya", bnName: "ডামুড্যা" },
    ],
  },

  // Chattogram Division
  {
    id: "chattogram",
    name: "Chattogram",
    bnName: "চট্টগ্রাম",
    divisionId: "chattogram",
    upazilas: [
      { id: "kotwali-ctg", name: "Kotwali", bnName: "কোতোয়ালী" },
      { id: "panchlaish", name: "Panchlaish", bnName: "পাঁচলাইশ" },
      { id: "halishahar", name: "Halishahar", bnName: "হালিশহর" },
      { id: "patenga", name: "Patenga", bnName: "পতেঙ্গা" },
      { id: "hathazari", name: "Hathazari", bnName: "হাটহাজারী" },
      { id: "sitakunda", name: "Sitakunda", bnName: "সীতাকুণ্ড" },
      { id: "mirsharai", name: "Mirsharai", bnName: "মীরসরাই" },
      { id: "patiya", name: "Patiya", bnName: "পটিয়া" },
    ],
  },
  {
    id: "coxsbazar",
    name: "Cox's Bazar",
    bnName: "কক্সবাজার",
    divisionId: "chattogram",
    upazilas: [
      { id: "coxsbazar-sadar", name: "Cox's Bazar Sadar", bnName: "কক্সবাজার সদর" },
      { id: "chakaria", name: "Chakaria", bnName: "চকরিয়া" },
      { id: "teknaf", name: "Teknaf", bnName: "টেকনাফ" },
      { id: "ramu", name: "Ramu", bnName: "রামু" },
      { id: "ukhiya", name: "Ukhiya", bnName: "উখিয়া" },
    ],
  },
  {
    id: "cumilla",
    name: "Cumilla",
    bnName: "কুমিল্লা",
    divisionId: "chattogram",
    upazilas: [
      { id: "cumilla-adarsha-sadar", name: "Adarsha Sadar", bnName: "আদর্শ সদর" },
      { id: "daudkandi", name: "Daudkandi", bnName: "দাউদকান্দি" },
      { id: "chandina", name: "Chandina", bnName: "চান্দিনা" },
      { id: "debidwar", name: "Debidwar", bnName: "দেবীদ্বার" },
    ],
  },
  {
    id: "feni",
    name: "Feni",
    bnName: "ফেনী",
    divisionId: "chattogram",
    upazilas: [
      { id: "feni-sadar", name: "Feni Sadar", bnName: "ফেনী সদর" },
      { id: "chhagalnaiya", name: "Chhagalnaiya", bnName: "ছাগলনাইয়া" },
    ],
  },
  {
    id: "brahmanbaria",
    name: "Brahmanbaria",
    bnName: "ব্রাহ্মণবাড়িয়া",
    divisionId: "chattogram",
    upazilas: [
      { id: "brahmanbaria-sadar", name: "Brahmanbaria Sadar", bnName: "ব্রাহ্মণবাড়িয়া সদর" },
      { id: "ashuganj", name: "Ashuganj", bnName: "আশুগঞ্জ" },
    ],
  },
  {
    id: "noakhali",
    name: "Noakhali",
    bnName: "নোয়াখালী",
    divisionId: "chattogram",
    upazilas: [
      { id: "noakhali-sadar", name: "Noakhali Sadar", bnName: "নোয়াখালী সদর" },
      { id: "begumganj", name: "Begumganj", bnName: "বেগমগঞ্জ" },
      { id: "senbagh", name: "Senbagh", bnName: "সেনবাগ" },
    ],
  },
  {
    id: "chandpur",
    name: "Chandpur",
    bnName: "চাঁদপুর",
    divisionId: "chattogram",
    upazilas: [
      { id: "chandpur-sadar", name: "Chandpur Sadar", bnName: "চাঁদপুর সদর" },
      { id: "hajiganj", name: "Hajiganj", bnName: "হাজীগঞ্জ" },
    ],
  },
  {
    id: "lakshmipur",
    name: "Lakshmipur",
    bnName: "লক্ষ্মীপুর",
    divisionId: "chattogram",
    upazilas: [
      { id: "lakshmipur-sadar", name: "Lakshmipur Sadar", bnName: "লক্ষ্মীপুর সদর" },
      { id: "raipur", name: "Raipur", bnName: "রায়পুর" },
    ],
  },
  {
    id: "khagrachhari",
    name: "Khagrachhari",
    bnName: "খাগড়াছড়ি",
    divisionId: "chattogram",
    upazilas: [
      { id: "khagrachhari-sadar", name: "Khagrachhari Sadar", bnName: "খাগড়াছড়ি সদর" },
    ],
  },
  {
    id: "rangamati",
    name: "Rangamati",
    bnName: "রাঙ্গামাটি",
    divisionId: "chattogram",
    upazilas: [
      { id: "rangamati-sadar", name: "Rangamati Sadar", bnName: "রাঙ্গামাটি সদর" },
    ],
  },
  {
    id: "bandarban",
    name: "Bandarban",
    bnName: "বান্দরবান",
    divisionId: "chattogram",
    upazilas: [
      { id: "bandarban-sadar", name: "Bandarban Sadar", bnName: "বান্দরবান সদর" },
    ],
  },

  // Rajshahi Division
  {
    id: "rajshahi",
    name: "Rajshahi",
    bnName: "রাজশাহী",
    divisionId: "rajshahi",
    upazilas: [
      { id: "boalia", name: "Boalia", bnName: "বোয়ালিয়া" },
      { id: "rajpara", name: "Rajpara", bnName: "রাজপাড়া" },
      { id: "motihar", name: "Motihar", bnName: "মতিহার" },
      { id: "paba", name: "Paba", bnName: "পবা" },
      { id: "godagari", name: "Godagari", bnName: "গোদাগাড়ী" },
    ],
  },
  {
    id: "bogra",
    name: "Bogura",
    bnName: "বগুড়া",
    divisionId: "rajshahi",
    upazilas: [
      { id: "bogura-sadar", name: "Bogura Sadar", bnName: "বগুড়া সদর" },
      { id: "sherpur-b", name: "Sherpur", bnName: "শেরপুর" },
      { id: "shibganj-b", name: "Shibganj", bnName: "শিবগঞ্জ" },
    ],
  },
  {
    id: "pabna",
    name: "Pabna",
    bnName: "পাবনা",
    divisionId: "rajshahi",
    upazilas: [
      { id: "pabna-sadar", name: "Pabna Sadar", bnName: "পাবনা সদর" },
      { id: "ishwardi", name: "Ishwardi", bnName: "ঈশ্বরদী" },
    ],
  },
  {
    id: "sirajganj",
    name: "Sirajganj",
    bnName: "সিরাজগঞ্জ",
    divisionId: "rajshahi",
    upazilas: [
      { id: "sirajganj-sadar", name: "Sirajganj Sadar", bnName: "সিরাজগঞ্জ সদর" },
      { id: "shahjadpur", name: "Shahjadpur", bnName: "শাহজাদপুর" },
    ],
  },
  {
    id: "naogaon",
    name: "Naogaon",
    bnName: "নওগাঁ",
    divisionId: "rajshahi",
    upazilas: [
      { id: "naogaon-sadar", name: "Naogaon Sadar", bnName: "নওগাঁ সদর" },
      { id: "patnitala", name: "Patnitala", bnName: "পত্নীতলা" },
    ],
  },
  {
    id: "natore",
    name: "Natore",
    bnName: "নাটোর",
    divisionId: "rajshahi",
    upazilas: [
      { id: "natore-sadar", name: "Natore Sadar", bnName: "নাটোর সদর" },
      { id: "singra", name: "Singra", bnName: "সিংড়া" },
    ],
  },
  {
    id: "chapainawabganj",
    name: "Chapainawabganj",
    bnName: "চাঁপাইনবাবগঞ্জ",
    divisionId: "rajshahi",
    upazilas: [
      { id: "chapai-sadar", name: "Chapainawabganj Sadar", bnName: "চাঁপাইনবাবগঞ্জ সদর" },
      { id: "shibganj-c", name: "Shibganj", bnName: "শিবগঞ্জ" },
    ],
  },
  {
    id: "joypurhat",
    name: "Joypurhat",
    bnName: "জয়পুরহাট",
    divisionId: "rajshahi",
    upazilas: [
      { id: "joypurhat-sadar", name: "Joypurhat Sadar", bnName: "জয়পুরহাট সদর" },
      { id: "panchbibi", name: "Panchbibi", bnName: "পাঁচবিবি" },
    ],
  },

  // Khulna Division
  {
    id: "khulna",
    name: "Khulna",
    bnName: "খুলনা",
    divisionId: "khulna",
    upazilas: [
      { id: "khulna-sadar", name: "Khulna Sadar", bnName: "খুলনা সদর" },
      { id: "sonadanga", name: "Sonadanga", bnName: "সোনাডাঙ্গা" },
      { id: "daulatpur", name: "Daulatpur", bnName: "দৌলতপুর" },
      { id: "dighalia", name: "Dighalia", bnName: "দিঘলিয়া" },
    ],
  },
  {
    id: "jashore",
    name: "Jashore",
    bnName: "যশোর",
    divisionId: "khulna",
    upazilas: [
      { id: "jashore-sadar", name: "Jashore Sadar", bnName: "যশোর সদর" },
      { id: "jhikargachha", name: "Jhikargachha", bnName: "ঝিকরগাছা" },
    ],
  },
  {
    id: "kushtia",
    name: "Kushtia",
    bnName: "কুষ্টিয়া",
    divisionId: "khulna",
    upazilas: [
      { id: "kushtia-sadar", name: "Kushtia Sadar", bnName: "কুষ্টিয়া সদর" },
      { id: "kumarkhali", name: "Kumarkhali", bnName: "কুমারখালী" },
    ],
  },
  {
    id: "satkhira",
    name: "Satkhira",
    bnName: "সাতক্ষীরা",
    divisionId: "khulna",
    upazilas: [
      { id: "satkhira-sadar", name: "Satkhira Sadar", bnName: "সাতক্ষীরা সদর" },
      { id: "kaliganj-s", name: "Kaliganj", bnName: "কালীগঞ্জ" },
    ],
  },
  {
    id: "bagerhat",
    name: "Bagerhat",
    bnName: "বাগেরহাট",
    divisionId: "khulna",
    upazilas: [
      { id: "bagerhat-sadar", name: "Bagerhat Sadar", bnName: "বাগেরহাট সদর" },
      { id: "mongla", name: "Mongla", bnName: "মোংলা" },
    ],
  },
  {
    id: "chuadanga",
    name: "Chuadanga",
    bnName: "চুয়াডাঙ্গা",
    divisionId: "khulna",
    upazilas: [
      { id: "chuadanga-sadar", name: "Chuadanga Sadar", bnName: "চুয়াডাঙ্গা সদর" },
      { id: "damurhuda", name: "Damurhuda", bnName: "দামুড়হুদা" },
    ],
  },
  {
    id: "jhenaidah",
    name: "Jhenaidah",
    bnName: "ঝিনাইদহ",
    divisionId: "khulna",
    upazilas: [
      { id: "jhenaidah-sadar", name: "Jhenaidah Sadar", bnName: "ঝিনাইদহ সদর" },
      { id: "kaliganj-j", name: "Kaliganj", bnName: "কালীগঞ্জ" },
    ],
  },
  {
    id: "magura",
    name: "Magura",
    bnName: "মাগুরা",
    divisionId: "khulna",
    upazilas: [
      { id: "magura-sadar", name: "Magura Sadar", bnName: "মাগুরা সদর" },
      { id: "sreepur-m", name: "Sreepur", bnName: "শ্রীপুর" },
    ],
  },
  {
    id: "meherpur",
    name: "Meherpur",
    bnName: "মেহেরপুর",
    divisionId: "khulna",
    upazilas: [
      { id: "meherpur-sadar", name: "Meherpur Sadar", bnName: "মেহেরপুর সদর" },
      { id: "gangni", name: "Gangni", bnName: "গাংনী" },
    ],
  },
  {
    id: "narail",
    name: "Narail",
    bnName: "নড়াইল",
    divisionId: "khulna",
    upazilas: [
      { id: "narail-sadar", name: "Narail Sadar", bnName: "নড়াইল সদর" },
      { id: "lohagagara", name: "Lohagara", bnName: "লোহাগড়া" },
    ],
  },

  // Barishal Division
  {
    id: "barishal",
    name: "Barishal",
    bnName: "বরিশাল",
    divisionId: "barishal",
    upazilas: [
      { id: "barishal-sadar", name: "Barishal Sadar", bnName: "বরিশাল সদর" },
      { id: "babuganj", name: "Babuganj", bnName: "বাবুগঞ্জ" },
      { id: "bakerganj", name: "Bakerganj", bnName: "বাকেরগঞ্জ" },
    ],
  },
  {
    id: "bhola",
    name: "Bhola",
    bnName: "ভোলা",
    divisionId: "barishal",
    upazilas: [
      { id: "bhola-sadar", name: "Bhola Sadar", bnName: "ভোলা সদর" },
      { id: "char-fasson", name: "Char Fasson", bnName: "চরফ্যাশন" },
    ],
  },
  {
    id: "patuakhali",
    name: "Patuakhali",
    bnName: "পটুয়াখালী",
    divisionId: "barishal",
    upazilas: [
      { id: "patuakhali-sadar", name: "Patuakhali Sadar", bnName: "পটুয়াখালী সদর" },
      { id: "kalapara", name: "Kalapara", bnName: "কলাপাড়া" },
    ],
  },
  {
    id: "pirojpur",
    name: "Pirojpur",
    bnName: "পিরোজপুর",
    divisionId: "barishal",
    upazilas: [
      { id: "pirojpur-sadar", name: "Pirojpur Sadar", bnName: "পিরোজপুর সদর" },
      { id: "mathbaria", name: "Mathbaria", bnName: "মঠবাড়িয়া" },
    ],
  },
  {
    id: "barguna",
    name: "Barguna",
    bnName: "বরগুনা",
    divisionId: "barishal",
    upazilas: [
      { id: "barguna-sadar", name: "Barguna Sadar", bnName: "বরগুনা সদর" },
      { id: "amtali", name: "Amtali", bnName: "আমতলী" },
    ],
  },
  {
    id: "jhalokati",
    name: "Jhalokati",
    bnName: "ঝালকাঠি",
    divisionId: "barishal",
    upazilas: [
      { id: "jhalokati-sadar", name: "Jhalokati Sadar", bnName: "ঝালকাঠি সদর" },
      { id: "nalchity", name: "Nalchity", bnName: "নলছিটি" },
    ],
  },

  // Sylhet Division
  {
    id: "sylhet",
    name: "Sylhet",
    bnName: "সিলেট",
    divisionId: "sylhet",
    upazilas: [
      { id: "sylhet-sadar", name: "Sylhet Sadar", bnName: "সিলেট সদর" },
      { id: "beanibazar", name: "Beanibazar", bnName: "বিয়ানীবাজার" },
      { id: "golapganj", name: "Golapganj", bnName: "গোলাপগঞ্জ" },
      { id: "biswanath", name: "Biswanath", bnName: "বিশ্বনাথ" },
    ],
  },
  {
    id: "moulvibazar",
    name: "Moulvibazar",
    bnName: "মৌলভীবাজার",
    divisionId: "sylhet",
    upazilas: [
      { id: "moulvibazar-sadar", name: "Moulvibazar Sadar", bnName: "মৌলভীবাজার সদর" },
      { id: "sreemangal", name: "Sreemangal", bnName: "শ্রীমঙ্গল" },
      { id: "kulaura", name: "Kulaura", bnName: "কুলাউড়া" },
    ],
  },
  {
    id: "habiganj",
    name: "Habiganj",
    bnName: "হবিগঞ্জ",
    divisionId: "sylhet",
    upazilas: [
      { id: "habiganj-sadar", name: "Habiganj Sadar", bnName: "হবিগঞ্জ সদর" },
      { id: "madhabpur", name: "Madhabpur", bnName: "মাধবপুর" },
      { id: "nabiganj", name: "Nabiganj", bnName: "নবীগঞ্জ" },
    ],
  },
  {
    id: "sunamganj",
    name: "Sunamganj",
    bnName: "সুনামগঞ্জ",
    divisionId: "sylhet",
    upazilas: [
      { id: "sunamganj-sadar", name: "Sunamganj Sadar", bnName: "সুনামগঞ্জ সদর" },
      { id: "chhatak", name: "Chhatak", bnName: "ছাতক" },
      { id: "jagannathpur", name: "Jagannathpur", bnName: "জগন্নাথপুর" },
    ],
  },

  // Rangpur Division
  {
    id: "rangpur",
    name: "Rangpur",
    bnName: "রংপুর",
    divisionId: "rangpur",
    upazilas: [
      { id: "rangpur-sadar", name: "Rangpur Sadar", bnName: "রংপুর সদর" },
      { id: "pirganj-r", name: "Pirganj", bnName: "পীরগঞ্জ" },
      { id: "badarganj", name: "Badarganj", bnName: "বদরগঞ্জ" },
    ],
  },
  {
    id: "dinajpur",
    name: "Dinajpur",
    bnName: "দিনাজপুর",
    divisionId: "rangpur",
    upazilas: [
      { id: "dinajpur-sadar", name: "Dinajpur Sadar", bnName: "দিনাজপুর সদর" },
      { id: "birganj", name: "Birganj", bnName: "বীরগঞ্জ" },
      { id: "parbatipur", name: "Parbatipur", bnName: "পার্বতীপুর" },
    ],
  },
  {
    id: "gaibandha",
    name: "Gaibandha",
    bnName: "গাইবান্ধা",
    divisionId: "rangpur",
    upazilas: [
      { id: "gaibandha-sadar", name: "Gaibandha Sadar", bnName: "গাইবান্ধা সদর" },
      { id: "gobindaganj", name: "Gobindaganj", bnName: "গোবিন্দগঞ্জ" },
    ],
  },
  {
    id: "kurigram",
    name: "Kurigram",
    bnName: "কুড়িগ্রাম",
    divisionId: "rangpur",
    upazilas: [
      { id: "kurigram-sadar", name: "Kurigram Sadar", bnName: "কুড়িগ্রাম সদর" },
      { id: "ulipur", name: "Ulipur", bnName: "উলিপুর" },
    ],
  },
  {
    id: "nilphamari",
    name: "Nilphamari",
    bnName: "নীলফামারী",
    divisionId: "rangpur",
    upazilas: [
      { id: "nilphamari-sadar", name: "Nilphamari Sadar", bnName: "নীলফামারী সদর" },
      { id: "saidpur", name: "Saidpur", bnName: "সৈয়দপুর" },
    ],
  },
  {
    id: "panchagarh",
    name: "Panchagarh",
    bnName: "পঞ্চগড়",
    divisionId: "rangpur",
    upazilas: [
      { id: "panchagarh-sadar", name: "Panchagarh Sadar", bnName: "পঞ্চগড় সদর" },
      { id: "tetulia", name: "Tetulia", bnName: "তেঁতুলিয়া" },
    ],
  },
  {
    id: "thakurgaon",
    name: "Thakurgaon",
    bnName: "ঠাকুরগাঁও",
    divisionId: "rangpur",
    upazilas: [
      { id: "thakurgaon-sadar", name: "Thakurgaon Sadar", bnName: "ঠাকুরগাঁও সদর" },
      { id: "pirganj-t", name: "Pirganj", bnName: "পীরগঞ্জ" },
    ],
  },
  {
    id: "lalmonirhat",
    name: "Lalmonirhat",
    bnName: "লালমনিরহাট",
    divisionId: "rangpur",
    upazilas: [
      { id: "lalmonirhat-sadar", name: "Lalmonirhat Sadar", bnName: "লালমনিরহাট সদর" },
      { id: "patgram", name: "Patgram", bnName: "পাটগ্রাম" },
    ],
  },

  // Mymensingh Division
  {
    id: "mymensingh",
    name: "Mymensingh",
    bnName: "ময়মনসিংহ",
    divisionId: "mymensingh",
    upazilas: [
      { id: "mymensingh-sadar", name: "Mymensingh Sadar", bnName: "ময়মনসিংহ সদর" },
      { id: "muktagachha", name: "Muktagachha", bnName: "মুক্তাগাছা" },
      { id: "trishal", name: "Trishal", bnName: "ত্রিশাল" },
      { id: "gaffargaon", name: "Gaffargaon", bnName: "গফরগাঁও" },
    ],
  },
  {
    id: "jamalpur",
    name: "Jamalpur",
    bnName: "জামালপুর",
    divisionId: "mymensingh",
    upazilas: [
      { id: "jamalpur-sadar", name: "Jamalpur Sadar", bnName: "জামালপুর সদর" },
      { id: "sarishabari", name: "Sarishabari", bnName: "সরিষাবাড়ী" },
    ],
  },
  {
    id: "netrokona",
    name: "Netrokona",
    bnName: "নেত্রকোণা",
    divisionId: "mymensingh",
    upazilas: [
      { id: "netrokona-sadar", name: "Netrokona Sadar", bnName: "নেত্রকোণা সদর" },
      { id: "durgapur", name: "Durgapur", bnName: "দুর্গাপুর" },
    ],
  },
  {
    id: "sherpur",
    name: "Sherpur",
    bnName: "শেরপুর",
    divisionId: "mymensingh",
    upazilas: [
      { id: "sherpur-sadar", name: "Sherpur Sadar", bnName: "শেরপুর সদর" },
      { id: "nakla", name: "Nakla", bnName: "নকলা" },
    ],
  },
];

export const BLOOD_GROUPS = [
  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
] as const;

export type BloodGroup = typeof BLOOD_GROUPS[number];
