export const site = {
  name: 'СЭР',
  nameLatin: 'SER',
  tagline: 'Сила. Энергия. Результат.',
  phone: '+7 (495) 000-00-00',
  phoneHref: 'tel:+74950000000',
  address: 'г. Москва, Ленинский пр., д. 123',
  inn: '770000000000',
  ogrnip: '324770000000000',
  copyright: `© ${new Date().getFullYear()} Фитнес-клуб «СЭР». Все права защищены.`,
} as const;

export const heroSlides = [
  {
    title: 'Твоя сила начинается здесь',
    subtitle: 'Премиальный фитнес-клуб с зонами для любого уровня подготовки',
    image: 'hero-1.jpg',
  },
  {
    title: 'Энергия на каждую тренировку',
    subtitle: 'Современное оборудование, опытные тренеры и атмосфера победителей',
    image: 'hero-2.jpg',
  },
] as const;

export const tariffs = [
  {
    id: '1-month',
    title: '1 месяц',
    price: 3500,
    oldPrice: 5000,
    discount: '-30%',
    features: ['Безлимитный зал', 'Раздевалка и душ', 'Wi-Fi'],
  },
  {
    id: '6-months',
    title: '6 месяцев',
    price: 15000,
    oldPrice: 21400,
    discount: '-30%',
    features: ['Всё из базового', '1 гостевой визит', 'Скидка на бар'],
    popular: true,
  },
  {
    id: '12-months',
    title: '12 месяцев',
    price: 25000,
    oldPrice: 35700,
    discount: '-30%',
    features: ['Максимальная выгода', '3 гостевых визита', 'Персональная консультация'],
  },
] as const;

export const services = [
  {
    title: 'Тренажёрный зал',
    description: 'Силовые и функциональные тренажёры премиум-класса',
    image: 'service-gym.jpg',
  },
  {
    title: 'Кардио-зона',
    description: 'Беговые дорожки, велотренажёры и эллипсы',
    image: 'service-cardio.jpg',
  },
  {
    title: 'Персональные тренировки',
    description: 'Индивидуальные программы с сертифицированными тренерами',
    image: 'service-personal.jpg',
  },
  {
    title: 'Групповые занятия',
    description: 'Йога, функционал, stretching и dance fitness',
    image: 'service-group.jpg',
  },
  {
    title: 'Фитнес-бар',
    description: 'Протеиновые коктейли, смузи и полезные перекусы',
    image: 'service-bar.jpg',
  },
] as const;

export const stats = [
  { value: 98, suffix: '%', label: 'довольных клиентов' },
  { value: 12, suffix: '', label: 'профессиональных тренеров' },
  { value: 24, suffix: '/7', label: 'режим работы клуба' },
] as const;

export const features = [
  {
    title: 'Современное оборудование',
    description: 'Тренажёры Technogym и Hammer Strength для эффективных тренировок',
    icon: 'dumbbell',
  },
  {
    title: 'Удобное расположение',
    description: '5 минут от метро, парковка для членов клуба',
    icon: 'location',
  },
  {
    title: 'Гибкий график',
    description: 'Клуб открыт круглосуточно — тренируйтесь когда удобно вам',
    icon: 'clock',
  },
] as const;

export const galleryImages = [
  'gallery-1.jpg',
  'gallery-2.jpg',
  'gallery-3.jpg',
  'gallery-4.jpg',
  'gallery-5.jpg',
] as const;

export const partners = [
  { name: 'Technogym', id: 'technogym' },
  { name: 'Nike', id: 'nike' },
  { name: 'Adidas', id: 'adidas' },
  { name: 'MyProtein', id: 'myprotein' },
  { name: 'Hammer', id: 'hammer' },
  { name: 'Reebok', id: 'reebok' },
] as const;

export const reviews = [
  {
    name: 'Алексей Морозов',
    company: 'IT-директор',
    text: 'За полгода в СЭР сбросил 12 кг и набрал мышечную массу. Тренеры реально вовлечены — программа под мои цели, а не шаблон.',
    image: 'review-1.jpg',
  },
  {
    name: 'Елена Соколова',
    company: 'Маркетолог',
    text: 'Лучший клуб в районе. Чисто, просторно, групповые занятия на уровне. Особенно нравится йога по утрам.',
    image: 'review-2.jpg',
  },
  {
    name: 'Дмитрий Волков',
    company: 'Предприниматель',
    text: 'Работаю допоздна — круглосуточный режим спасает. Оборудование новое, очередей к тренажёрам нет.',
    image: 'review-3.jpg',
  },
  {
    name: 'Анна Кузнецова',
    company: 'Дизайнер',
    text: 'Взяла годовой абонемент и не жалею. Персональная консультация в подарок помогла выстроить питание.',
    image: 'review-4.jpg',
  },
] as const;

export const aboutText =
  'Клуб «СЭР» — это пространство, где каждая тренировка приближает к цели. Мы объединили премиальное оборудование, профессиональную команду и атмосферу, которая мотивирует возвращаться снова и снова.';
