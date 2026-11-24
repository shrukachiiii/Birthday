// Personalize the words, password, date, captions, and photo filenames in this file.
export const birthday = {
  chapterLabels: ['The beginning', 'November, for you', 'Little moments', 'Hello, you', 'A little letter', 'Make a wish', 'My wishes', 'Ten little things', 'My beloved memories', 'Our moments', 'Our timeline', 'All my love'],
  password: '2529',
  birthdayDate: 25,
  birthdayMonth: 'November',
  birthdayMonthIndex: 10,
  birthdayYear: 2005,
  photoPaths: Array.from({ length: 15 }, (_, i) => `${import.meta.env.BASE_URL}assets/photos/memory-${String(i + 1).padStart(2, '0')}${i < 10 ? '.jpg' : '.jpeg'}`),
  photoCaptions: [
    'The way your laugh fills a room', 'Our little ordinary adventures',
    'Every “just one more photo”', 'The quiet moments I keep close',
    'How you make anywhere feel like home', 'That look that says everything',
    'Our favourite kind of day', 'The stories only we know',
    'The softest place to land', 'All the little things, forever',
  ],
  polaroidCaptions: ['The long way home', 'Our kind of sunshine', 'A day worth keeping', 'Just us, being us'],
  login: {
    eyebrow: 'A LITTLE SOMETHING, JUST FOR YOU', titleLine1: 'Someone Special', titleLine2: 'Has a Surprise for You!',
    subtitle: 'A little world made just for you.', passwordHint: 'forever',
  },
  home: {
    kicker: 'today is all about you', heading: 'Happy birthday,', headingScript: 'my one & only love.',
    note: 'For the person who makes ordinary days feel like the very best kind of magic.',
    button: 'Open your birthday memories', signature: 'all my love, always', photoCaption: 'my favourite human',
  },
  calendar: {
    kicker: 'circle this one, always', heading: 'our favourite month.', note: 'One whole month to celebrate you.',
    asideKicker: 'the stars lined up', asideHeading: 'And you arrived.',
    asideNote: 'Some dates are more than dates. They are the beginning of every lovely thing that came after.',
    secret: 'My favourite day, because it’s yours.',
  },
  scrapbook: {
    kicker: 'collected, carefully', heading: 'Our beautiful memories.', note: 'Little pieces of a life I love living with you.',
  },
  about: {
    kicker: 'in case you forgot', heading: 'Hello, my favourite person!',
    paragraphs: [
      'You are the kind of person who makes people feel seen, makes laughter come easily, and makes every place feel a little more like home.',
      'I hope you know how loved you are — today, tomorrow, and in all the small in-between moments.',
    ], signature: 'the world is softer with you in it',
  },
  letter: {
    sealed: 'a note, tucked away just for you', openButton: 'Open your letter', kicker: 'for you, with all my heart',
    heading: 'A birthday message for mine favourite person.', salutation: 'My love,',
    paragraphs: [
      'On your birthday, I keep thinking about how lucky I am that this world brought you into mine. You make the small things brighter, the hard things softer, and the good things even better.',
      'I hope this next trip around the sun brings you the same warmth and joy you give to everyone lucky enough to know you.',
      'Keep being exactly, wonderfully you.',
    ], signoff: 'Happy birthday, have a great day!', from: 'love from shruu, stay with me forever, my love', signature: 'love you adii', photoCaption: 'my person, my place, my home',
  },
  cake: {
    kicker: 'close your eyes for a second', heading: 'It’s time to make a wish!', note: 'Make it a good one. The universe is listening.',
    prompt: 'Tap the cake when you’re ready', answer: 'May all your dreams come true. ♡', buttonHint: 'tap to blow them out',
  },
  wishes: {
    kicker: 'little hopes for your new year', heading: 'My wishes for you.',
    list: ['Be happy, always.', 'Keep smiling that smile.', 'Achieve everything you dream of.', 'Stay surrounded by love.', 'May happiness follow you everywhere.'],
    signoff: 'and a thousand more, for every day ahead ♡',
  },
  ten: { kicker: 'a tiny list, a very big love', heading: '10 things I remember about you.', center: 'you, you, always you' },
  favourites: { kicker: 'the little things add up', heading: 'My beloved memories.', note: 'Proof that the best days are the ones we share.', mainCaption: 'a day I wish I could fold up and keep', sideCaptions: ['you + me + nowhere to be', 'my favourite kind of ordinary'], noteSticker: 'somewhere between here & forever' },
  moments: { kicker: 'little scenes, kept forever', heading: 'Our moments together.', note: 'The moments we shared, and all the ones still waiting for us.', mainCaption: 'the very best kind of day', closing: 'Anywhere is my favourite place, when I’m there with you.' },
  timeline: { kicker: 'our story, in little snapshots', heading: 'The moments we shared.', dates: ['THE VERY BEGINNING', 'ONE OF THOSE PERFECT DAYS', 'AND EVERY DAY AFTER'], notes: ['The start of a hundred favourite stories.', 'The kind of afternoon that turns into a keepsake.', 'Wherever we are, that’s my favourite place.'], closing: 'The best part of every memory is that it has you in it.' },
  final: {
    kicker: 'one last thing, before you go', heading: 'Once again, happy birthday, my beloved.',
    note: 'I hope today feels like being wrapped up in every bit of love you deserve. Thank you for being you, and for letting me love you.',
    signature: 'love you adii', photoCaption: 'my person, my place, my home',
  },
};
