import { Poem } from '../types';

export const poems: Poem[] = [
  {
    id: '1',
    title: 'O Nanna Chetana',
    kannadaTitle: 'ಓ ನನ್ನ ಚೇತನ',
    poetId: 'kuvempu',
    category: 'Nature',
    publishedDate: '1940-01-01',
    content: `ಓ ನನ್ನ ಚೇತನ, ಆಗು ನೀ ಅನಿಕೇತನ!

 ರೂಪ ರೂಪಗಳನು ದಾಟಿ,
 ನಾಮ ಕೋಟಿಗಳನು ಮೀಟಿ,
 ಎದೆಯ ಬಿರಿಯೆ ಭಾವದೀಟಿ
 ಆಗು ನೀ ಅನಿಕೇತನ!

 ನೂರು ಮತದ ಹೊಟ್ಟೆ ತೂರಿ,
 ಎಲ್ಲಾ ತತ್ತ್ವಗಳನು ಮೀರಿ,
 ಎಲ್ಲಾ ಕಟ್ಟುಗಳನು ಹರಿದು
 ಆಗು ನೀ ಅನಿಕೇತನ!`,
    meanings: {
      'ಚೇತನ': {
        word: 'ಚೇತನ',
        meaning: 'Spirit / Consciousness',
        example: 'ನನ್ನ ಚೇತನವು ಜಾಗೃತವಾಯಿತು.'
      },
      'ಅನಿಕೇತನ': {
        word: 'ಅನಿಕೇತನ',
        meaning: 'Limitless (Not bound by one place)',
        example: 'ವಿಶ್ವವೇ ಅವನ ಮನೆ, ಅವನೇ ಅನಿಕೇತನ.'
      }
    },
    audioUrl: '/audio/o-nanna-chetana.mp3'
  },
  {
    id: '2',
    title: 'Mankuthimmana Kagga #1',
    kannadaTitle: 'ಮಂಕುತಿಮ್ಮನ ಕಗ್ಗ #೧',
    poetId: 'dvg',
    category: 'Philosophy',
    publishedDate: '1943-01-01',
    content: `ಹುಲ್ಲಾಗು ಬೆಟ್ಟದಡಿ, ಮನೆಗೆ ಮಲ್ಲಿಗೆಯಾಗು
 ಕಲ್ಲಾಗು ಕಷ್ಟಗಳ ಮಳೆಯ ವಿಧಿ ಸುರಿಯೆ
 ಬೆಲ್ಲವಾಗು ಸಕ್ಕರೆಯಾಗು ದೀನದುರ್ಬಲರಿಗೆ
 ಎಲ್ಲರೊಳಗೊಂದಾಗು ಮಂಕುತಿಮ್ಮ`,
    meanings: {
      'ಹುಲ್ಲಾಗು': {
        word: 'ಹುಲ್ಲಾಗು',
        meaning: 'Be like grass (stay humble)',
        example: 'ವಿನಯಶೀಲನಾಗಿ ಹುಲ್ಲಾಗು.'
      }
    },
    audioUrl: '/audio/mankuthimmana-kagga-1.mp3'
  },
  {
    id: '3',
    title: 'Baaro Sadhana Kerige',
    kannadaTitle: 'ಬಾರೋ ಸಾಧನ ಕೇರಿಗೆ',
    poetId: 'bendre',
    category: 'Love',
    publishedDate: '1932-01-01',
    content: `ಬಾರೋ ಸಾಧನ ಕೇರಿಗೆ
 ನಮ್ಮೀ ಗಾರುಡಿಗರ ಊರಿಗೆ
 ಏನನು ಕಾಣೆವು, ಏನನು ಕೇಳೆವು
 ಬರಿಗಣ್ಣಿನ ಈ ಗೆಳೆಯರಿಗೆ`,
    meanings: {
      'ಗಾರುಡಿಗ': {
        word: 'ಗಾರುಡಿಗ',
        meaning: 'Magician / Charmer',
        example: 'ಅವನೊಬ್ಬ ಸಾಹಿತ್ಯ ಲೋಕದ ಗಾರುಡಿಗ.'
      }
    },
    audioUrl: '/audio/baaro-sadhana-kerige.mp3'
  },
  {
    id: '4',
    title: 'Hacchevu Kannadada Deepa',
    kannadaTitle: 'ಹಚ್ಚೇವು ಕನ್ನಡದ ದೀಪ',
    poetId: 'ds_karki',
    category: 'Social',
    publishedDate: '1950-01-01',
    content: `ಹಚ್ಚೇವು ಕನ್ನಡದ ದೀಪ!
 ಕರುನಾಡ ದೀಪ, ಸಿರಿನುಡಿಯ ದೀಪ,
 ಒಲವೆತ್ತಿ ಹಿಡಿದ ಗೆಲುವಿನ ದೀಪ!`,
    meanings: {
      'ಹಚ್ಚೇವು': {
        word: 'ಹಚ್ಚೇವು',
        meaning: 'We shall light',
        example: 'ನಾವು ಪ್ರೀತಿಯ ಹಣತೆಯನ್ನು ಹಚ್ಚೇವು.'
      }
    },
    audioUrl: '/audio/hacchevu-kannadada-deepa.mp3'
  },
  {
    id: '5',
    title: 'Jogi',
    kannadaTitle: 'ಜೋಗಿ',
    poetId: 'bendre',
    category: 'Devotion',
    publishedDate: '1945-01-01',
    content: `ಬಂದಾನೋ ಜೋಗಿ ಬಂದಾನೋ
 ಊರ ಹೊರಗಿನ ಗುಡಿಯಲಿ ನಿಂತಾನೋ
 ಕಾವಿ ಬಟ್ಟೆಯ ತೊಟ್ಟು, ಕೈಯಲಿ ಜೋಳಿಗೆ ಹಿಡಿದು
 ಶಾಂತಿ ಮಂತ್ರವ ಜಪಿಸುತ ಬಂದಾನೋ`,
    meanings: {
      'ಜೋಗಿ': {
        word: 'ಜೋಗಿ',
        meaning: 'Ascetic / Monk',
        example: 'ಜೋಗಿಯು ಶಾಂತಿಯ ಸಂದೇಶ ತಂದನು.'
      }
    },
    audioUrl: '/audio/jogi.mp3'
  },
  {
    id: '6',
    title: 'Negila Yogi',
    kannadaTitle: 'ನೇಗಿಲ ಯೋಗಿ',
    poetId: 'kuvempu',
    category: 'Nature',
    publishedDate: '1946-01-01',
    content: `ನೇಗಿಲ ಹಿಡಿದ ಯೋಗಿ ನೋಡಲ್ಲಿ
 ಫಲವನು ಬಯಸದ ಕರ್ಮಯೋಗಿ
 ಲೋಕದ ಹಸಿವನು ನೀಗುವ ದೇವ`,
    meanings: {
      'ನೇಗಿಲ': {
        word: 'ನೇಗಿಲ',
        meaning: 'Plough',
        example: 'ರೈತನು ನೇಗಿಲ ಹಿಡಿದು ಹೊರಟನು.'
      }
    },
    audioUrl: '/audio/negila-yogi.mp3'
  },
  {
    id: '7',
    title: 'Bhaavageethe',
    kannadaTitle: 'ಭಾವಗೀತೆ',
    poetId: 'ds_karki',
    category: 'Love',
    publishedDate: '1952-01-01',
    content: `ಹೂವಾಡಗಿತ್ತಿ ನೀ ಹೋಗೆಲ್ಲಿಗೆ
 ಕಂಪು ಚೆಲ್ಲುವ ಹಾದಿಗೆ
 ಪ್ರೀತಿಯ ಸುಮವನು ತಂದಿಹೆನು`,
    audioUrl: '/audio/bhaavageethe.mp3',
    meanings: {}
  },
  {
    id: '8',
    title: 'Tanuvu Ninnadu',
    kannadaTitle: 'ತನುವು ನಿನ್ನದು ಮನವು ನಿನ್ನದು',
    poetId: 'kuvempu',
    category: 'Devotion',
    publishedDate: '1942-01-01',
    content: `ತನುವು ನಿನ್ನದು ಮನವು ನಿನ್ನದು
 ಎನ್ನ ಜೀವನವು ನಿನ್ನದು
 ಬಗೆಬಗೆಯ ಭಾವಗಳೆಲ್ಲವೂ ನಿನ್ನದು`,
    audioUrl: '/audio/tanuvu-ninnadu.mp3',
    meanings: {
      'ತನುವು': { word: 'ತನುವು', meaning: 'Body', example: 'ತನುವು ದೇವನ ದೇಗುಲ.' }
    }
  },
  {
    id: '9',
    title: 'Elladaru Iru Enthadaru Iru',
    kannadaTitle: 'ಎಲ್ಲಾದರು ಇರು ಎಂತಾದರು ಇರು',
    poetId: 'kuvempu',
    category: 'Social',
    publishedDate: '1948-01-01',
    content: `ಎಲ್ಲಾದರು ಇರು ಎಂತಾದರು ಇರು
 ಎಂದೆಂದಿಗೂ ನೀ ಕನ್ನಡವಾಗಿರು
 ಕನ್ನಡವೇ ಸತ್ಯ, ಕನ್ನಡವೇ ನಿತ್ಯ`,
    audioUrl: '/audio/elladaru-iru.mp3',
    meanings: {}
  },
  {
    id: '10',
    title: 'Belagu',
    kannadaTitle: 'ಬೆಳಗು',
    poetId: 'bendre',
    category: 'Nature',
    publishedDate: '1935-01-01',
    content: `ಮೂಡಲ ಮನೆಯ ಮುತ್ತಿನ ನೀರಿನ
 ಎರಕವ ಹೊಯ್ದ ನುಣ್ಣನೆ ಕೆಂಡದಂತೆ
 ಬೆಳಗು ಬರುತ್ತಿದೆ ನೋಡು ಹಕ್ಕಿಗಳ ಸ್ವರದಲಿ`,
    audioUrl: '/audio/belagu.mp3',
    meanings: {}
  },
  {
    id: '11',
    title: 'Hachheyavu Kannadada Deepa',
    kannadaTitle: 'ಹಚ್ಚೇವು ಕನ್ನಡದ ದೀಪ',
    poetId: 'ds_karki',
    category: 'Social',
    publishedDate: '1955-01-01',
    content: `ಹಚ್ಚೇವು ಕನ್ನಡದ ದೀಪ
 ಕರುನಾಡ ದೀಪ, ಸಿರಿನುಡಿಯ ದೀಪ
 ಒಲವೆತ್ತಿ ಹಿಡಿದ ದೀಪ`,
    meanings: {
      'ನುಡಿಯ': { word: 'ನುಡಿಯ', meaning: 'Language/Speech', example: 'ನಮ್ಮ ನುಡಿಯು ನಮಗೆ ಹೆಮ್ಮೆ.' }
    }
  },
  {
    id: '12',
    title: 'Ananda Maya',
    kannadaTitle: 'ಆನಂದಮಯ ಈ ಜಗನ್ಮಯ',
    poetId: 'kuvempu',
    category: 'Philosophy',
    publishedDate: '1940-01-01',
    content: `ಆನಂದಮಯ ಈ ಜಗನ್ಮಯ
 ಹಸಿರಿಟ್ಟ ಮಲೆಗಳ ನೋಡು ಮೆರೆವೆ
 ನೀಲವಾರಿಧಿಯ ಅಲೆಯಲಿ ನಲಿಯುವ`,
    meanings: {
      'ಜಗನ್ಮಯ': { word: 'ಜಗನ್ಮಯ', meaning: 'Pervading the universe', example: 'ದೇವನು ಜಗನ್ಮಯನಾಗಿದ್ದಾನೆ.' }
    }
  },
  {
    id: '13',
    title: 'Kurudu Kanchana',
    kannadaTitle: 'ಕುರುಡು ಕಾಂಚನ ಕುಣಿಯುತ್ತಲಿತ್ತು',
    poetId: 'bendre',
    category: 'Social',
    publishedDate: '1938-01-01',
    content: `ಕುರುಡು ಕಾಂಚನ ಕುಣಿಯುತ್ತಲಿತ್ತು
 ಕಾಲಿಗೆ ಬಿದ್ದವರ ತುಳಿಯುತ್ತಲಿತ್ತು
 ಮನುಷ್ಯತ್ವವನ್ನು ಮರೆಯುತ್ತಲಿತ್ತು`,
    meanings: {
      'ಕಾಂಚನ': { word: 'ಕಾಂಚನ', meaning: 'Gold/Wealth', example: 'ಧನಿಕನು ಕಾಂಚನದ ಮೋಹದಲ್ಲಿದ್ದಾನೆ.' }
    }
  },
  {
    id: '14',
    title: 'Mankutimmana Kagga - Verse 1',
    kannadaTitle: 'ಮಂಕುತಿಮ್ಮನ ಕಗ್ಗ - ೧',
    poetId: 'dvg',
    category: 'Philosophy',
    publishedDate: '1943-01-01',
    content: `ಶ್ರೀ ವಿಷ್ಣು ವಿಶ್ವಾದಿ ಮೂಲ ಮಾಯಾಲೋಲ 
 ದೇವ ನೀನೊಬ್ಬನೇ ನಮ್ಮ ಕಾಯುವವ 
 ಈ ಜಗವೆಂಬುದು ಅವನ ಆಟದ ಬಯಲು`,
    meanings: {
      'ಮಾಯಾಲೋಲ': { word: 'ಮಾಯಾಲೋಲ', meaning: 'Enchanter/Lover of Maya', example: 'ಬ್ರಹ್ಮನು ಮಾಯಾಲೋಲನಾಗಿದ್ದಾನೆ.' }
    }
  },
  {
    id: '15',
    title: 'Ellaru Maduvudu Hottigagi',
    kannadaTitle: 'ಎಲ್ಲರೂ ಮಾಡುವುದು ಹೊಟ್ಟೆಗಾಗಿ',
    poetId: 'purandara_dasa',
    category: 'Philosophy',
    publishedDate: '1530-01-01',
    content: `ಎಲ್ಲರೂ ಮಾಡುವುದು ಹೊಟ್ಟೆಗಾಗಿ 
 ಗೇಣು ಬಟ್ಟೆಗಾಗಿ 
 ಹಗಲಿರುಳು ಕಷ್ಟಪಟ್ಟು ದುಡಿಯುವುದು`,
    meanings: {
      'ಗೇಣು': { word: 'ಗೇಣು', meaning: 'A unit of length (span)', example: 'ಹಸಿವು ಗೇಣು ಬಟ್ಟೆಗಿಂತ ಹಿರಿದು.' }
    }
  },
  {
    id: '16',
    title: 'Ullavaru Shivalaya Maduvaru',
    kannadaTitle: 'ಉಳ್ಳವರು ಶಿವಾಲಯ ಮಾಡುವರು',
    poetId: 'basavanna',
    category: 'Devotion',
    publishedDate: '1160-01-01',
    content: `ಉಳ್ಳವರು ಶಿವಾಲಯ ಮಾಡುವರು 
 ನಾನೇನ ಮಾಡುವೆ ಬಡವನಯ್ಯಾ 
 ಎನ್ನ ಕಾಲೇ ಕಂಬ, ದೇಹವೇ ದೇಗುಲ 
 ಶಿರವೇ ಹೊನ್ನ ಕಳಸವಯ್ಯಾ 
 ಕೂಡಲಸಂಗಮದೇವ ಕೇಳಯ್ಯಾ 
 ಸ್ಥಾವರಕ್ಕಳಿವುಂಟು ಜಂಗಮಕ್ಕಳಿವಿಲ್ಲ`,
    meanings: {
      'ಸ್ಥಾವರ': { word: 'ಸ್ಥಾವರ', meaning: 'Static/Immovable structures', example: 'ಸ್ಥಾವರಕ್ಕಳಿವುಂಟು.' },
      'ಜಂಗಮ': { word: 'ಜಂಗಮ', meaning: 'Moving/Living spirit', example: 'ಜಂಗಮಕ್ಕಳಿವಿಲ್ಲ.' }
    }
  },
  {
    id: '17',
    title: 'Kalabeda Kolabeda',
    kannadaTitle: 'ಕಳಬೇಡ ಕೊಲಬೇಡ',
    poetId: 'basavanna',
    category: 'Social',
    publishedDate: '1160-01-01',
    content: `ಕಳಬೇಡ ಕೊಲಬೇಡ 
 ಹುಸಿಯ ನುಡಿಯಲು ಬೇಡ 
 ಮುನಿಯಬೇಡ ಅನ್ಯರಿಗೆ ಅಸಹ್ಯಪಡಬೇಡ 
 ತನ್ನ ಬಣ್ಣಿಸಬೇಡ ಇದಿರ ಹಳಿಯಲು ಬೇಡ 
 ಇದೇ ಅಂತರಂಗಶುದ್ಧಿ ಇದೇ ಬಹಿರಂಗಶುದ್ಧಿ 
 ಇದೇ ನಮ್ಮ ಕೂಡಲಸಂಗಮನೊಲಿಸುವ ಪರಿ`,
    meanings: {
      'ಅಂತರಂಗಶುದ್ಧಿ': { word: 'ಅಂತರಂಗಶುದ್ಧಿ', meaning: 'Inner purity', example: 'ಮನಸ್ಸಿನ ಅಂತರಂಗಶುದ್ಧಿ ಬಹಳ ಮುಖ್ಯ.' }
    }
  },
  {
    id: '18',
    title: 'Vachana #18',
    kannadaTitle: 'ದೇವಲೋಕ ಮರ್ತ್ಯಲೋಕ ಬೇರೆ ಇಲ್ಲ',
    poetId: 'basavanna',
    category: 'Philosophy',
    publishedDate: '1160-01-01',
    content: `ದೇವಲೋಕ ಮರ್ತ್ಯಲೋಕವೆಂಬುದು ಬೇರೆ ಇಲ್ಲ ಕಾಣಿ ಭೋ! 
 ಸತ್ಯವ ನುಡಿಯುವುದೇ ದೇವಲೋಕ 
 ಮಿಥ್ಯವ ನುಡಿಯುವುದೇ ಮರ್ತ್ಯಲೋಕ 
 ಆಚಾರವೇ ಸ್ವರ್ಗ, ಅನಾಚಾರವೇ ನರಕ 
 ಇದುವೇ ಸತ್ಯ ಕೂಡಲಸಂಗಮದೇವ`,
    meanings: {
      'ಮರ್ತ್ಯಲೋಕ': { word: 'ಮರ್ತ್ಯಲೋಕ', meaning: 'Mortal world/Earth', example: 'ಮರ್ತ್ಯಲೋಕವು ಕರ್ಮಭೂಮಿ.' }
    }
  },
  {
    id: '19',
    title: 'Lokaada Donka Neevu',
    kannadaTitle: 'ಲೋಕದ ಡೊಂಕ ನೀವೇಕೆ ತಿದ್ದುವಿರಿ?',
    poetId: 'basavanna',
    category: 'Social',
    publishedDate: '1160-01-01',
    content: `ಲೋಕದ ಡೊಂಕ ನೀವೇಕೆ ತಿದ್ದುವಿರಿ? 
 ನಿಮ್ಮ ನಿಮ್ಮ ತನುವ ತಿದ್ದಿಕೊಳ್ಳಿ 
 ನಿಮ್ಮ ನಿಮ್ಮ ಮನವ ತಿದ್ದಿಕೊಳ್ಳಿ 
 ನೆರೆಮನೆಯ ದುಃಖಕ್ಕೆ ಅಳುವವರ ಮೆಚ್ಚ ನಮ್ಮ ಕೂಡಲಸಂಗಮದೇವ`,
    meanings: {
      'ಡೊಂಕ': { word: 'ಡೊಂಕ', meaning: 'Crookedness/Curve', example: 'ಲೋಕದ ಡೊಂಕನ್ನು ಸರಿಪಡಿಸಲು ಹೋದನು.' }
    }
  },
  {
    id: '20',
    title: 'Vachana #20',
    kannadaTitle: 'ನುಡಿದರೆ ಮುತ್ತಿನ ಹಾರದಂತಿರಬೇಕು',
    poetId: 'basavanna',
    category: 'Philosophy',
    publishedDate: '1160-01-01',
    content: `ನುಡಿದರೆ ಮುತ್ತಿನ ಹಾರದಂತಿರಬೇಕು 
 ನುಡಿದರೆ ಮಾಣಿಕ್ಯದ ದೀಪ್ತಿಯಂತಿರಬೇಕು 
 ನುಡಿದರೆ ಸ್ಪಟಿಕದ ಸಲಾಕೆಯಂತಿರಬೇಕು 
 ನುಡಿದರೆ ಲಿಂಗ ಮೆಚ್ಚಿ ಅಹುದಹುದೆನಬೇಕು 
 ಕೂಡಲಸಂಗಮದೇವ ಕೇಳಯ್ಯಾ`,
    meanings: {
      'ಮಾಣಿಕ್ಯದ': { word: 'ಮಾಣಿಕ್ಯದ', meaning: 'Of Ruby/Gemstone', example: 'ಅವನ ಮಾತು ಮಾಣಿಕ್ಯದಂತೆ ಹೊಳೆಯಿತು.' }
    }
  },
  {
    id: '21',
    title: 'Chilume',
    kannadaTitle: 'ಏರಿದರೆ ಏರಬೇಕು ಎತ್ತರಕ್ಕೆ',
    poetId: 'ds_karki',
    category: 'Nature',
    publishedDate: '1955-01-01',
    content: `ಏರಿದರೆ ಏರಬೇಕು ಎತ್ತರಕ್ಕೆ 
 ಇಳಿದರೆ ಇಳಿಯಬೇಕು ಆಳಕ್ಕೆ 
 ನಡೆದರೆ ಅಡಿ ಅಡಿಯೂ ಧೃಢವಾಗಿರಬೇಕು 
 ಬದುಕಿದರೆ ವೀರನಾಗಿ ಬದುಕಿರಬೇಕು`,
    meanings: {
      'ಧೃಢವಾಗಿರಬೇಕು': { word: 'ಧೃಢವಾಗಿರಬೇಕು', meaning: 'Must be firm/strong', example: 'ನಡಿಗೆ ಧೃಢವಾಗಿರಬೇಕು.' }
    }
  },
  {
    id: '22',
    title: 'Vachana #22',
    kannadaTitle: 'ಬೆಟ್ಟದ ಮೇಲೊಂದು ಮನೆಯ ಮಾಡಿ',
    poetId: 'akkamahadevi',
    category: 'Philosophy',
    publishedDate: '1160-01-01',
    content: `ಬೆಟ್ಟದ ಮೇಲೊಂದು ಮನೆಯ ಮಾಡಿ 
 ಮೃಗಗಳಿಗೆ ಅಂಜಿದಡೆಂತಯ್ಯಾ? 
 ಸಮುದ್ರದ ತಡಿಯಲೊಂದು ಮನೆಯ ಮಾಡಿ 
 ನೊರೆತೆರೆಗಳಿಗೆ ಅಂಜಿದಡೆಂತಯ್ಯಾ? 
 ಚೆನ್ನಮಲ್ಲಿಕಾರ್ಜುನದೇವ ಕೇಳಯ್ಯಾ`,
    meanings: {
      'ಮೃಗಗಳಿಗೆ': { word: 'ಮೃಗಗಳಿಗೆ', meaning: 'Wild animals', example: 'ಕಾಡಿನ ಮೃಗಗಳಿಗೆ ಭಯಪಡಬೇಡ.' }
    }
  },
  {
    id: '23',
    title: 'Kayo Sri Gauri',
    kannadaTitle: 'ಕಾಯೋ ಶ್ರೀ ಗೌರಿ',
    poetId: 'bendre',
    category: 'Devotion',
    publishedDate: '1930-01-01',
    content: `ಕಾಯೋ ಶ್ರೀ ಗೌರಿ ಕರುಣಾಲಹರಿ 
 ನಿನಗೆ ನಾ ಶರಣು ಹೂವಿನ ಹರಿ 
 ಮನೆ ಮನೆಗಳ ಬೆಳಕೇ ನೀ ತಾಯಿ 
 ಸಲಹಮ್ಮ ನಮ್ಮನ್ನು ನಿತ್ಯವೂ ಕಾಯಿ`,
    meanings: {
      'ಸಲಹಮ್ಮ': { word: 'ಸಲಹಮ್ಮ', meaning: 'Protect us (Motherly figure)', example: 'ತಾಯಿಯೇ ನಮ್ಮನ್ನು ಸಲಹಮ್ಮ.' }
    }
  },
  {
    id: '24',
    title: 'Neenu Yaaro Naanu Yaaro',
    kannadaTitle: 'ನೀನು ಯಾರೋ ನಾನು ಯಾರೋ',
    poetId: 'kanaka_dasa',
    category: 'Philosophy',
    publishedDate: '1550-01-01',
    content: `ನೀನು ಯಾರೋ ನಾನು ಯಾರೋ 
 ಇಬ್ಬರೂ ಕೂಡಿದವರಾರೋ? 
 ಈ ಮಾಯಾಲೋಕದಲಿ ನಮ್ಮನ್ನು 
 ಸೇರಿಸಿದ ದೇವರ್ಯಾರೋ?`,
    meanings: {
      'ಮಾಯಾಲೋಕದಲಿ': { word: 'ಮಾಯಾಲೋಕದಲಿ', meaning: 'In the world of illusion', example: 'ಬದುಕು ಮಾಯಾಲೋಕದ ಪಯಣ.' }
    }
  },
  {
    id: '25',
    title: 'Badukidenu Badukidenu',
    kannadaTitle: 'ಬದುಕಿದೆನು ಬದುಕಿದೆನು ಭವದ ಭಯ ನೀಗಿತು',
    poetId: 'purandara_dasa',
    category: 'Devotion',
    publishedDate: '1540-01-01',
    content: `ಬದುಕಿದೆನು ಬದುಕಿದೆನು ಭವದ ಭಯ ನೀಗಿತು 
 ಪದುಮನಾಭನ ಪಾದ ಹೃದಯದಲಿ ನಿಂತಿತು 
 ಹರಿಯ ನಾಮದ ಸ್ಮರಣೆ ಒದಗಿ ಬಂದಿತು 
 ಗುರುವಿನ ಕೃಪೆಯಿಂದ ಮುಕ್ತಿ ದೊರಕಿತು`,
    meanings: {
      'ಭವದ': { word: 'ಭವದ', meaning: 'Of existence/earthly life', example: 'ಭವದ ಭಯವು ದೂರವಾಯಿತು.' }
    }
  },
  {
    id: '26',
    title: 'Kula Kula Kulaavennuvaru',
    kannadaTitle: 'ಕುಲ ಕುಲ ಕುಲವೆಂದು ಹೊಡೆದಾಡದಿರಿ',
    poetId: 'kanaka_dasa',
    category: 'Social',
    publishedDate: '1560-01-01',
    content: `ಕುಲ ಕುಲ ಕುಲವೆಂದು ಹೊಡೆದಾಡದಿರಿ 
 ನಿಮ್ಮ ಕುಲದ ನೆಲೆಯೇನಾದರೂ ಬಲ್ಲಿರಾ? 
 ಹುಟ್ಟುವಾಗ ಯಾವ ಕುಲ? ಸಾಯುವಾಗ ಯಾವ ಕುಲ? 
 ಆತ್ಮಕ್ಕೆ ಉಂಟೆ ಕುಲದ ಹಂಗು?`,
    meanings: {
      'ನೆಲೆಯೇನಾದರೂ': { word: 'ನೆಲೆಯೇನಾದರೂ', meaning: 'The source/foundation', example: 'ನಿನ್ನ ಬದುಕಿನ ನೆಲೆಯಾವುದು?' }
    }
  },
  {
    id: '27',
    title: 'Mankuthimmana Kagga #27',
    kannadaTitle: 'ಬದುಕು ಜಟಕಾಬಂಡಿ, ವಿಧಿ ಅದರ ಸಾಹೇಬ',
    poetId: 'dvg',
    category: 'Philosophy',
    publishedDate: '1943-01-01',
    content: `ಬದುಕು ಜಟಕಾಬಂಡಿ, ವಿಧಿ ಅದರ ಸಾಹೇಬ 
 ಕುದುರೆ ನೀನ್, ಅವನು ಹೇಳಿದಂತೆ ಓಡುವವ 
 ಮದುವೆಗೆ ಹೋಗೋದು ವಿಧಿಯ ಲಿಖಿತ 
 ಚಿತೆಗೇರುವುದೆಂದು ಅವನಿಗೇ ಗೊತ್ತು 
 ಮಂಕುತಿಮ್ಮ`,
    meanings: {
      'ಸಾಹೇಬ': { word: 'ಸಾಹೇಬ', meaning: 'Master/Owner', example: 'ಬದುಕಿನ ಬಂಡಿಗೆ ವಿಧಿಯೇ ಸಾಹೇಬ.' }
    }
  },
  {
    id: '28',
    title: 'Muttina Haara',
    kannadaTitle: 'ಮುತ್ತಿನಂಥ ಮಾತು ನಡುಮನೆಗೆ ತಂದಿತು',
    poetId: 'ds_karki',
    category: 'Love',
    publishedDate: '1958-01-01',
    content: `ಮುತ್ತಿನಂಥ ಮಾತು ನಡುಮನೆಗೆ ತಂದಿತು 
 ಮನೆ ತುಂಬಾ ಹೊಸ ಹೂವ ಪರಿಮಳ ಹರಡಿತು 
 ಪ್ರೀತಿಯ ರಾಯಭಾರಿ ನೀ ಬಂದು ನಿಂತಾಗ 
 ಕನಸಿನ ಲೋಕವೇ ಎದುರಾದಂತಾಯಿತು`,
    meanings: {
      'ಪರಿಮಳ': { word: 'ಪರಿಮಳ', meaning: 'Fragrance', example: 'ಮಲ್ಲಿಗೆಯ ಪರಿಮಳ ಮನ್ಮೋಹಕ.' }
    }
  },
  {
    id: '29',
    title: 'Vachana #29',
    kannadaTitle: 'ಕಾಯಕವೇ ಕೈಲಾಸ',
    poetId: 'basavanna',
    category: 'Social',
    publishedDate: '1160-01-01',
    content: `ಕಾಯಕವೇ ಕೈಲಾಸ 
 ಇದುವೇ ನಮ್ಮ ಮೂಲ ಮಂತ್ರ 
 ಶ್ರಮಜೀವಿಯೇ ಶ್ರೇಷ್ಠ ಜೀವ 
 ಕೆಲಸವ ಮಾಡುತ ದೇವರ ಕಾಣು 
 ಕೂಡಲಸಂಗಮದೇವ ಕೇಳಯ್ಯಾ`,
    meanings: {
      'ಕಾಯಕವೇ': { word: 'ಕಾಯಕವೇ', meaning: 'Work/Labour', example: 'ಬದುಕಿನಲ್ಲಿ ಕಾಯಕವೇ ಶ್ರೇಷ್ಠ.' }
    }
  },
  {
    id: '30',
    title: 'Mankuthimmana Kagga #30',
    kannadaTitle: 'ಕಲ್ಲು ಕೆತ್ತಿದವನು ಶಿಲ್ಪಿ, ಮಾತು ಕಟ್ಟಿದವನು ಕವಿ',
    poetId: 'dvg',
    category: 'Philosophy',
    publishedDate: '1943-01-01',
    content: `ಕಲ್ಲು ಕೆತ್ತಿದವನು ಶಿಲ್ಪಿ, ಮಾತು ಕಟ್ಟಿದವನು ಕವಿ 
 ಬದುಕು ಕಟ್ಟಿದವನು ಮಹಾತ್ಮ 
 ನಿನ್ನ ಪಾತ್ರವ ನೀನು ಸರಿಯಾಗಿ ನಿರ್ವಹಿಸು 
 ಉಳಿದದ್ದು ದೈವದ ಇಚ್ಛೆ 
 ಮಂಕುತಿಮ್ಮ`,
    meanings: {
      'ನಿರ್ವಹಿಸು': { word: 'ನಿರ್ವಹಿಸು', meaning: 'To perform/manage', example: 'ನಿನ್ನ ಕರ್ತವ್ಯವನ್ನು ನಿರ್ವಹಿಸು.' }
    }
  },
  {
    id: '31',
    title: 'Karnataka Padavi',
    kannadaTitle: 'ಕರ್ನಾಟಕದ ಪದವಿ ಇದು',
    poetId: 'kuvempu',
    category: 'Social',
    publishedDate: '1955-01-01',
    content: `ಸಿರಿಗನ್ನಡಂ ಗೆಲ್ಗೆ ಸಿರಿಗನ್ನಡಂ ಬಾಳ್ಗೆ 
 ಕನ್ನಡವೇ ನಮ್ಮ ಉಸಿರು 
 ಕನ್ನಡವೇ ನಮ್ಮ ಹಸಿರು 
 ನಾಡಿನ ಹೆಮ್ಮೆ ನಮಗಾಗಿ ಎಂದೆಂದೂ ಇರಲಿ`,
    meanings: {}
  },
  {
    id: '32',
    title: 'Hakkigalu',
    kannadaTitle: 'ಹಕ್ಕಿಗಳ ಹಾರಾಟದ ಹಾದಿಯಲಿ',
    poetId: 'bendre',
    category: 'Nature',
    publishedDate: '1936-01-01',
    content: `ಹಕ್ಕಿಗಳ ಹಾರಾಟದ ಹಾದಿಯಲಿ 
 ನಾನು ನನ್ನನ್ನು ಮರೆತು ಹೋದೆ 
 ಮುಗಿಲ ಬಣ್ಣದಲಿ ನನ್ನ ಕನಸುಗಳ ಬೆರೆಸಿ 
 ಮುಂಜಾನೆಯ ತಂಪಿನಲಿ ನಲಿದಾಡಿದೆ`,
    meanings: {
      'ಮುಗಿಲ': { word: 'ಮುಗಿಲ', meaning: 'Of the sky', example: 'ಮುಗಿಲ ಬಣ್ಣ ಕೆಂಪಾಯಿತು.' }
    }
  },
  {
    id: '33',
    title: 'Neneve Nimmannu',
    kannadaTitle: 'ನೆನೆವೆ ನಿಮ್ಮನ್ನು ಕಷ್ಟದ ಕಾಲದಲಿ',
    poetId: 'akkamahadevi',
    category: 'Devotion',
    publishedDate: '1160-01-01',
    content: `ನೆನೆವೆ ನಿಮ್ಮನ್ನು ಕಷ್ಟದ ಕಾಲದಲಿ 
 ಶರಣು ಬಂದೆನು ಚನ್ನಮಲ್ಲಿಕಾರ್ಜುನನೆ 
 ಬೇರೇನೂ ಬೇಡ ನಿನ್ನ ಕೃಪೆಯೊಂದಿರಲಿ 
 ಈ ಭವಬಂಧನವ ನೀಗಿಸು ಪ್ರಭುವೇ`,
    meanings: {
      'ಭವಬಂಧನವ': { word: 'ಭವಬಂಧನವ', meaning: 'The bondage of life', example: 'ಭವಬಂಧನದಿಂದ ಮುಕ್ತಿ ಬೇಕು.' }
    }
  },
  {
    id: '34',
    title: 'Dasa Saahitya',
    kannadaTitle: 'ರಂಗಾ ನಿನ್ನ ಒಲವಿರುವವರೆಗೆ',
    poetId: 'purandara_dasa',
    category: 'Devotion',
    publishedDate: '1545-01-01',
    content: `ರಂಗಾ ನಿನ್ನ ಒಲವಿರುವವರೆಗೆ 
 ನಮಗೇಕೋ ಭಯ ಲೋಕದಲಿ? 
 ಕಾವ ದೇವನಿದ್ದ ಮೇಲೆ 
 ಚಿಂತೆಯೇಕೆ ಈ ಸಂಸಾರದಲಿ?`,
    meanings: {
      'ಚಿಂತೆಯೇಕೆ': { word: 'ಚಿಂತೆಯೇಕೆ', meaning: 'Why worry?', example: 'ಮನದಲ್ಲಿ ಚಿಂತೆಯೇಕೆ ನೆಲೆಸಿದೆ?' }
    }
  },
  {
    id: '35',
    title: 'Mankuthimmana Kagga #35',
    kannadaTitle: 'ಸವಿ ಸವಿ ಮಾತು ಮನೆಯ ಸವಿಯ ಹೆಚ್ಚಿಸುವುದು',
    poetId: 'dvg',
    category: 'Philosophy',
    publishedDate: '1943-01-01',
    content: `ಸವಿ ಸವಿ ಮಾತು ಮನೆಯ ಸವಿಯ ಹೆಚ್ಚಿಸುವುದು 
 ಪ್ರೀತಿಯ ನಡೆ ಬಾಂಧವ್ಯವ ಗಟ್ಟಿಗೊಳಿಸುವುದು 
 ಸುಳ್ಳಿನ ಮರೆಯಲ್ಲಿ ಬದುಕು ನಡೆಸಬೇಡ 
 ಸತ್ಯದ ಬೆಳಕಲಿ ಹಾದಿ ಸಾಗು 
 ಮಂಕುತಿಮ್ಮ`,
    meanings: {
      'ಬಾಂಧವ್ಯವ': { word: 'ಬಾಂಧವ್ಯವ', meaning: 'Relationship/Bond', example: 'ನಮ್ಮ ಬಾಂಧವ್ಯವು ಬೆಳೆಯಲಿ.' }
    }
  },
  {
    id: '36',
    title: 'Kogileya Haadu',
    kannadaTitle: 'ಕೋಗಿಲೆಯ ಹಾಡು ಕೇಳು ಮುಂಜಾನೆ',
    poetId: 'ds_karki',
    category: 'Nature',
    publishedDate: '1960-01-01',
    content: `ಕೋಗಿಲೆಯ ಹಾಡು ಕೇಳು ಮುಂಜಾನೆ 
 ಮಾವಿನ ಕೊಂಬೆಯಲಿ ಮರೆಯಾಗಿ 
 ಪ್ರಕೃತಿಯ ಸಂಗೀತದಲಿ ಮಧುರ ಭಾವ 
 ತುಂಬಿ ಹರಿಯುತಲಿದೆ ಈ ಲೋಕಕೆ`,
    meanings: {
      'ಕೊಂಬೆಯಲಿ': { word: 'ಕೊಂಬೆಯಲಿ', meaning: 'On the branch', example: 'ಹಕ್ಕಿಯು ಕೊಂಬೆಯಲಿ ಕುಳಿತಿದೆ.' }
    }
  },
  {
    id: '37',
    title: 'Vachana #37',
    kannadaTitle: 'ದಯೆಯೇ ಧರ್ಮದ ಮೂಲವಯ್ಯಾ',
    poetId: 'basavanna',
    category: 'Social',
    publishedDate: '1160-01-01',
    content: `ದಯೆಯೇ ಧರ್ಮದ ಮೂಲವಯ್ಯಾ 
 ದಯವಿಲ್ಲದ ಧರ್ಮವದವುದಯ್ಯಾ? 
 ಸಕಲ ಜೀವರಾಶಿಯಲ್ಲಿ ದಯವಿರಬೇಕು 
 ಆ ದಯವೇ ಕೂಡಲಸಂಗಯ್ಯನ ಒಲವಯ್ಯಾ`,
    meanings: {
      'ದಯೆಯೇ': { word: 'ದಯೆಯೇ', meaning: 'Compassion/Kindness', example: 'ದಯೆಯೇ ಬದುಕಿನ ಶ್ರೇಷ್ಠ ಗುಣ.' }
    }
  },
  {
    id: '38',
    title: 'Naliyೋ Naliyೋ',
    kannadaTitle: 'ನಲಿಯೋ ನಲಿಯೋ ಎನ್ನ ಮನವೇ',
    poetId: 'bendre',
    category: 'Love',
    publishedDate: '1938-01-01',
    content: `ನಲಿಯೋ ನಲಿಯೋ ಎನ್ನ ಮನವೇ 
 ಹೊಸ ಹೂವಿನ ಕಂಪಿಗಾಗಿ 
 ಬದುಕಿನ ಪ್ರತಿಯೊಂದು ಕ್ಷಣವೂ 
 ಒಂದು ಹೊಸ ಸುರುಳಿ ಬಿಚ್ಚುತ್ತದೆ`,
    meanings: {}
  },
  {
    id: '39',
    title: 'Mankuthimmana Kagga #39',
    kannadaTitle: 'ನಗು ನಗುತ್ತಾ ಬದುಕು, ನಗುವಿನಲಿ ದೇವರನ್ನು ಕಾಣು',
    poetId: 'dvg',
    category: 'Philosophy',
    publishedDate: '1943-01-01',
    content: `ನಗು ನಗುತ್ತಾ ಬದುಕು, ನಗುವಿನಲಿ ದೇವರನ್ನು ಕಾಣು 
 ಅಳುವಿನಲಿ ಕೂಡ ಒಂದು ಪಾಠವಿದೆ 
 ಸೋಲಿಗೆ ಕುಗ್ಗಬೇಡ, ಗೆಲುವಿಗೆ ಬೀಗಬೇಡ 
 ಸಮಚಿತ್ತದಲಿ ಪ್ರಯಾಣ ಸಾಗಲಿ 
 ಮಂಕುತಿಮ್ಮ`,
    meanings: {
      'ಸಮಚಿತ್ತದಲಿ': { word: 'ಸಮಚಿತ್ತದಲಿ', meaning: 'With equanimity', example: 'ಸಮಚಿತ್ತದಲಿ ಬದುಕು ಸಾಗಿಸು.' }
    }
  },
  {
    id: '40',
    title: 'Tanu Karagada Vachana',
    kannadaTitle: 'ತನು ಕರಗದವರಲ್ಲಿ ಪುಷ್ಪವನೊಲ್ಲೆ ನಾನು',
    poetId: 'basavanna',
    category: 'Devotion',
    publishedDate: '1160-01-01',
    content: `ತನು ಕರಗದವರಲ್ಲಿ ಪುಷ್ಪವನೊಲ್ಲೆ ನಾನು 
 ಮನ ಕರಗದವರಲ್ಲಿ ಗಂಧವನೊಲ್ಲೆ ನಾನು 
 ಭಾವವಿಲ್ಲದವನಲ್ಲಿ ಭಕ್ತಿಯನೊಲ್ಲೆ ನಾನು 
 ಕೂಡಲಸಂಗಮದೇವ ಕೇಳಯ್ಯಾ`,
    meanings: {
      'ಕರಗದವರಲ್ಲಿ': { word: 'ಕರಗದವರಲ್ಲಿ', meaning: 'Among those who do not melt (emotionally)', example: 'ಪೂಜೆಯಲ್ಲಿ ಮನ ಕರಗಬೇಕು.' }
    }
  },
  {
    id: '41',
    title: 'Mankuthimmana Kagga #41',
    kannadaTitle: 'ಧರ್ಮವೆಂಬುದು ಹಾದಿ, ನೀತಿ ಎನ್ನುವುದು ನಡಿಗೆ',
    poetId: 'dvg',
    category: 'Philosophy',
    publishedDate: '1943-01-01',
    content: `ಧರ್ಮವೆಂಬುದು ಹಾದಿ, ನೀತಿ ಎನ್ನುವುದು ನಡಿಗೆ 
 ಇವೆರಡನ್ನೂ ಮೀರಿ ಒಂದು ಶಕ್ತಿಯಿದೆ 
 ನಿನಗೆ ಸೇರಿದುದನ್ನು ನೀನು ಕಾಪಾಡು 
 ಉಳಿದುದಕ್ಕೆ ಹಂಬಲಿಸಬೇಡ 
 ಮಂಕುತಿಮ್ಮ`,
    meanings: {
      'ಹಂಬಲಿಸಬೇಡ': { word: 'ಹಂಬಲಿಸಬೇಡ', meaning: 'Do not crave/long for', example: 'ಅನ್ಯರ ಸೊತ್ತಿಗೆ ಹಂಬಲಿಸಬೇಡ.' }
    }
  },
  {
    id: '42',
    title: 'Karnataka Janapada',
    kannadaTitle: 'ಬೆಳಗಾಗಿ ನಾನು ಯಾರ ಮುಖವ ನೋಡಲಿ?',
    poetId: 'kuvempu',
    category: 'Nature',
    publishedDate: '1944-01-01',
    content: `ಬೆಳಗಾಗಿ ನಾನು ಯಾರ ಮುಖವ ನೋಡಲಿ? 
 ಮುಂಜಾನೆಯ ತಂಗಾಳಿಯ ಮುಖವನ್ನೇ ನೋಡುವೆ 
 ಹಸಿರು ತುಂಬಿದ ಗದ್ದೆಯಲಿ 
 ಬಂಗಾರದ ಮುತ್ತುಗಳ ಹನಿಯನ್ನೇ ಕಾಣುವೆ`,
    meanings: {
      'ತಂಗಾಳಿಯ': { word: 'ತಂಗಾಳಿಯ', meaning: 'Cool breeze', example: 'ಮುಂಜಾನೆಯ ತಂಗಾಳಿ ಮಧುರ.' }
    }
  },
  {
    id: '43',
    title: 'Vachana #43',
    kannadaTitle: 'ಆಶೆ ಎಂಬುದು ಅತಿಶಯವಾಗಿ',
    poetId: 'akkamahadevi',
    category: 'Philosophy',
    publishedDate: '1160-01-01',
    content: `ಆಶೆ ಎಂಬುದು ಅತಿಶಯವಾಗಿ 
 ಮನವ ಮಲಿನಗೊಳಿಸುತಿದೆ 
 ಚೆನ್ನಮಲ್ಲಿಕಾರ್ಜುನದೇವ ಕೇಳಯ್ಯಾ 
 ಈ ಅರಿಷಡ್ವರ್ಗವ ನೀಗಿಸು ತಂದೆ`,
    meanings: {
      'ಅರಿಷಡ್ವರ್ಗವ': { word: 'ಅರಿಷಡ್ವರ್ಗವ', meaning: 'Six internal enemies (Lust, Anger, etc.)', example: 'ಅರಿಷಡ್ವರ್ಗವನ್ನು ಜಯಿಸಬೇಕು.' }
    }
  },
  {
    id: '44',
    title: 'Nammamma Sharade',
    kannadaTitle: 'ನಮ್ಮಮ್ಮ ಶಾರದೆ ದಯೆತೋರು ಬಾರೇ',
    poetId: 'purandara_dasa',
    category: 'Devotion',
    publishedDate: '1535-01-01',
    content: `ನಮ್ಮಮ್ಮ ಶಾರದೆ ದಯೆತೋರು ಬಾರೇ 
 ವಿದ್ಯಾಭಿಮಾನಿನಿ ಶ್ರೀ ಶಾರದಾಂಬೆ 
 ಅಜ್ಞಾನ ಕತ್ತಲೆಯ ನೀಗಿಸಿ ಬೆಳಕ 
 ಜೀವನದ ದಾರಲಿ ಹರಿಸು ತಾಯೇ`,
    meanings: {
      'ಅಜ್ಞಾನ': { word: 'ಅಜ್ಞಾನ', meaning: 'Ignorance', example: 'ವಿದ್ಯೆಯಿಂದ ಅಜ್ಞಾನ ದೂರವಾಗುವುದು.' }
    }
  },
  {
    id: '45',
    title: 'Mankuthimmana Kagga #45',
    kannadaTitle: 'ಸಂಸಾರವೆಂಬುದು ಒಂದು ಪಾಠಶಾಲೆ',
    poetId: 'dvg',
    category: 'Philosophy',
    publishedDate: '1943-01-01',
    content: `ಸಂಸಾರವೆಂಬುದು ಒಂದು ಪಾಠಶಾಲೆ 
 ಪ್ರತಿದಿನವೂ ಹೊಸವೊಂದು ಪಾಠ 
 ಕಲಿಯುವ ಮನಸ್ಸಿದ್ದರೆ ಸಾಕು 
 ಜ್ಞಾನದ ಕಾಂತಿ ಸುರಿಯುವುದು ನಿತ್ಯ 
 ಮಂಕುತಿಮ್ಮ`,
    meanings: {
      'ಪಾಠಶಾಲೆ': { word: 'ಪಾಠಶಾಲೆ', meaning: 'School', example: 'ಬದುಕೇ ಒಂದು ದೊಡ್ಡ ಪಾಠಶಾಲೆ.' }
    }
  },
  {
    id: '46',
    title: 'Sone Male',
    kannadaTitle: 'ಸೋನೆ ಮಳೆಯಲಿ ತೊಯ್ದ ಒಂದು ಹೂವು',
    poetId: 'ds_karki',
    category: 'Love',
    publishedDate: '1962-01-01',
    content: `ಸೋನೆ ಮಳೆಯಲಿ ತೊಯ್ದ ಒಂದು ಹೂವು 
 ತನ್ನ ಕಂಪಿಗಾಗಿ ಕಾಯುತ ಕುಳಿತಿದೆ 
 ನೀ ಬಂದು ಮುಟ್ಟಿದ ಮರುಕ್ಷಣವೇ 
 ಹೊಸದೊಂದು ಲೋಕವೇ ಅರಳಿದೆ`,
    meanings: {
      'ಸೋನೆ': { word: 'ಸೋನೆ', meaning: 'Drizzling/Soft rain', example: 'ಸೋನೆ ಮಳೆಯ ಹನಿಯು ಹಿತಕಾರಿಯಾಗಿದೆ.' }
    }
  },
  {
    id: '47',
    title: 'Vachana #47',
    kannadaTitle: 'ಮಾಡಿ ಮಾಡಿ ಸೀದರು ಅಜ್ಞಾನಿಗಳು',
    poetId: 'basavanna',
    category: 'Social',
    publishedDate: '1160-01-01',
    content: `ಮಾಡಿ ಮಾಡಿ ಸೀದರು ಅಜ್ಞಾನಿಗಳು 
 ಪೂಜೆ ಪುನಸ್ಕಾರಗಳ ಹೆಸರಿನಲಿ 
 ಮನ ಶುದ್ಧವಿಲ್ಲದವರ ಪೂಜೆಯ ಮೆಚ್ಚ 
 ನಮ್ಮ ಕೂಡಲಸಂಗಮದೇವ ಕೇಳಯ್ಯಾ`,
    meanings: {
      'ಪುನಸ್ಕಾರಗಳ': { word: 'ಪುನಸ್ಕಾರಗಳ', meaning: 'Rituals/Worship acts', example: 'ಬಹಿರಂಗದ ಪುನಸ್ಕಾರಗಳಿಗಿಂತ ಅಂತರಂಗಶುದ್ಧಿ ಮುಖ್ಯ.' }
    }
  },
  {
    id: '48',
    title: 'Ninnolumeye Emage Deepa',
    kannadaTitle: 'ನಿನ್ನೊಲುಮೆಯೇ ನಮಗೆ ದಾರಿದೀಪ',
    poetId: 'kanaka_dasa',
    category: 'Devotion',
    publishedDate: '1570-01-01',
    content: `ನಿನ್ನೊಲುಮೆಯೇ ನಮಗೆ ದಾರಿದೀಪ 
 ಕಷ್ಟದ ಕತ್ತಲೆಯ ಹಾದಿಯಲಿ 
 ಕೇಶವನ ನಾಮವ ಸ್ಮರಿಸುತಿದ್ದರೆ 
 ಇನ್ನೇನು ಭಯ ಈ ಲೋಕದಲಿ?`,
    meanings: {
      'ನಿನ್ನೊಲುಮೆಯೇ': { word: 'ನಿನ್ನೊಲುಮೆಯೇ', meaning: 'Thy love/Grace', example: 'ದೇವನೊಲುಮೆಯೇ ನಮಗೆ ಸಮಸ್ತ.' }
    }
  },
  {
    id: '49',
    title: 'Mankuthimmana Kagga #49',
    kannadaTitle: 'ಸಮಯದ ಬೆಲೆ ಬಲ್ಲವನೇ ಬಲ್ಲಿದ',
    poetId: 'dvg',
    category: 'Philosophy',
    publishedDate: '1943-01-01',
    content: `ಸಮಯದ ಬೆಲೆ ಬಲ್ಲವನೇ ಬಲ್ಲಿದ 
 ಸಂದ ಕ್ಷಣವದು ತಿರುಗಿ ಬರದು 
 ಮಾಡಬೇಕಾದ ಕೆಲಸವ ಅಂದೇ ಮಾಡು 
 ನಾಳೆಯ ನಂಬಿಕೆಯಲಿ ಇರಬೇಡ 
 ಮಂಕುತಿಮ್ಮ`,
    meanings: {
      'ಬಲ್ಲಿದ': { word: 'ಬಲ್ಲಿದ', meaning: 'Rich/Wealthy or Competent', example: 'ಸಮಯದ ಸದ್ವಿನಿಯೋಗ ಮಾಡುವವನೇ ಬಲ್ಲಿದ.' }
    }
  },
  {
    id: '50',
    title: 'Jayabharatha Jananiya',
    kannadaTitle: 'ಜಯ ಭಾರತ ಜನನಿಯ ತನುಜಾತೆ',
    poetId: 'kuvempu',
    category: 'Social',
    publishedDate: '1930-01-01',
    content: `ಜಯ ಭಾರತ ಜನನಿಯ ತನುಜಾತೆ 
 ಜಯ ಹೇ ಕರ್ನಾಟಕ ಮಾತೆ 
 ಜಯ ಸುಂದರ ನದಿ ವನಗಳ ನಾಡೇ 
 ಜಯ ಹೇ ರಸಋಷಿಗಳ ಪುಣ್ಯ ಭೂಮಿಯೇ`,
    meanings: {
      'ತನುಜಾತೆ': { word: 'ತನುಜಾತೆ', meaning: 'Daughter (born of)', example: 'ಭಾರತ ಮಾತೆಯ ತನುಜಾತೆ ಕರ್ನಾಟಕ ಮಾತೆ.' }
    }
  },
  {
    id: '51',
    title: 'Final Verse',
    kannadaTitle: 'ಕನ್ನಡ ಸಾಹಿತ್ಯ ಲೋಕದ ಬೆಳಕು',
    poetId: 'bendre',
    category: 'Philosophy',
    publishedDate: '1980-01-01',
    content: `ಕನ್ನಡ ಸಾಹಿತ್ಯ ಲೋಕದ ಬೆಳಕು 
 ಎಂದೆಂದಿಗೂ ನಮ್ಮ ಹಾದಿ ಬೆಳಗಲಿ 
 ಪುರಾತನ ಕಾವ್ಯಗಳ ಸಿರಿವಂತಿಕೆ 
 ಯುವ ಜನತೆಯ ಮನಸ್ಸು ಗೆಲ್ಲಲಿ`,
    meanings: {}
  }
];

export const getPoemOfTheDay = (): Poem => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const index = dayOfYear % poems.length;
  return poems[index];
};
