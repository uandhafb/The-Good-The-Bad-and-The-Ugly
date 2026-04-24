export class MusicTheory {
  private scales = {
    major: [0, 2, 4, 5, 7, 9, 11],
    minor: [0, 2, 3, 5, 7, 8, 10],
    dorian: [0, 2, 3, 5, 7, 9, 10],
    phrygian: [0, 1, 3, 5, 7, 8, 10],
    lydian: [0, 2, 4, 6, 7, 9, 11],
    mixolydian: [0, 2, 4, 5, 7, 9, 10],
    aeolian: [0, 2, 3, 5, 7, 8, 10],
    locrian: [0, 1, 3, 5, 6, 8, 10],
    pentatonic: [0, 2, 4, 7, 9],
    blues: [0, 3, 5, 6, 7, 10],
    chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    wholetone: [0, 2, 4, 6, 8, 10],
    harmonic_minor: [0, 2, 3, 5, 7, 8, 11],
    melodic_minor: [0, 2, 3, 5, 7, 9, 11],
    ritusen: [0, 2, 5, 7, 9],
    pelog: [0, 1, 3, 7, 8],
    hirajoshi: [0, 2, 3, 7, 8],
    iwato: [0, 1, 5, 6, 10],
    enigmatic: [0, 1, 4, 6, 8, 10, 11],
    prometheus: [0, 2, 4, 6, 9, 10]
  };

  private chordProgressions = {
    pop: ['I', 'V', 'vi', 'IV'],
    jazz: ['IIM7', 'V7', 'IM7'],
    blues: ['I7', 'I7', 'I7', 'I7', 'IV7', 'IV7', 'I7', 'I7', 'V7', 'IV7', 'I7', 'V7'],
    folk: ['I', 'IV', 'I', 'V'],
    rock: ['I', 'bVII', 'IV', 'I'],
    classical: ['I', 'IV', 'V', 'I'],
    modal: ['i', 'bVII', 'IV', 'i'],
    edm: ['i', 'VI', 'III', 'VII'],
    // Extended additions
    jazz_extended: ['IIM9', 'V13', 'IM9'],
    funk_extended: ['i9', 'bVII', 'VI', 'V13'],
    modal_extended: ['i11', 'bVII', 'IV9', 'i9'],
    neo_soul_extended: ['IM9', 'V13', 'vi11', 'IV9'],
    cinematic_minor_extended: ['i9', 'VImaj9', 'IIImaj7', 'V13'],
   // Brazilian funk often uses minor keys with extended chords and modal interchange.
    brazilian_funk_ousadia: ['i9', 'bVII', 'VI', 'V13'],
    brazilian_funk_ambient: ['i11', 'bVII', 'IV9', 'i9'],
    brazilian_funk_bruxaria: ['i9', 'bVII', 'bVI', 'V7'],
    brazilian_funk_ritmado: ['i7', 'bVII', 'IV9', 'V7'],
    brazilian_funk_magrao: ['i9', 'VI', 'bVII', 'V13'],
    brazilian_funk_zn: ['i11', 'bVII', 'IV9', 'bVI'],
  
  };

/**
   * Normalizes note names (including flats/sharps).
   */
  private normalizeNote(note: string): string {
    const normalized = note.trim().toUpperCase().replace('♯', '#').replace('♭', 'B');
    const enharmonicMap: Record<string, string> = {
      DB: 'C#',
      EB: 'D#',
      GB: 'F#',
      AB: 'G#',
      BB: 'A#',
      CB: 'B',
      FB: 'E',
      'E#': 'F',
      'B#': 'C',
    };
    return enharmonicMap[normalized] || normalized;
  }

  private normalizeKeyRoot(key: string): string {
  const parsed = key.trim().match(/^([A-Ga-g])([#b♯♭]?)/);
  if (!parsed) {
    throw new Error(`Invalid key: ${key}`);
  }
  return this.normalizeNote(`${parsed[1].toUpperCase()}${parsed[2] || ''}`);
}


  /**
   * Generates a musical scale from a root note
   * @param root - Root note (e.g., 'C', 'D#', 'F')
   * @param scaleName - Scale type (e.g., 'major', 'minor', 'pentatonic')
   * @returns Array of note names in the scale
   * @throws {Error} When root note or scale name is invalid
   */
  generateScale(root: string, scaleName: keyof typeof this.scales): string[] {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const normalizedRoot = this.normalizeNote(root);
    const rootIndex = noteNames.indexOf(normalizedRoot);
    if (rootIndex === -1) {
      throw new Error(`Invalid root note: ${root}`);
    }

    const scale = this.scales[scaleName];
    if (!scale) {
      throw new Error(`Invalid scale: ${scaleName}`);
    }
    
    return scale.map(interval => {
      const noteIndex = (rootIndex + interval) % 12;
      return noteNames[noteIndex];
    });
  }

  /**
   * Generates a chord progression for a given key and style
   * @param key - Musical key (e.g., 'C', 'Am')
   * @param style - Progression style (e.g., 'pop', 'jazz', 'blues')
   * @returns Space-separated string of chord names
   * @throws {Error} When style is invalid
   */

  generateChordProgression(key: string, style: keyof typeof this.chordProgressions): string {
  const progression = this.chordProgressions[style];
  if (!progression) {
    throw new Error(`Invalid progression style: ${style}`);
  }

  const root = this.normalizeKeyRoot(key);

  const chordMap: Record<string, string> = {
    'I': root,
    'I7': `${root}7`,
    'IM7': `${root}maj7`,
    'IM9': `${root}maj9`,
    'IM11': `${root}maj11`,
    'IM13': `${root}maj13`,

    'i': `${root.toLowerCase()}m`,
    'i7': `${root.toLowerCase()}m7`,
    'i9': `${root.toLowerCase()}m9`,
    'i11': `${root.toLowerCase()}m11`,
    'i13': `${root.toLowerCase()}m13`,

    'ii': `${this.getNote(root, 2)}m`,
    'IIM7': `${this.getNote(root, 2)}m7`,
    'IIM9': `${this.getNote(root, 2)}m9`,
    'IIM11': `${this.getNote(root, 2)}m11`,

    'iii': `${this.getNote(root, 4)}m`,
    'III': this.getNote(root, 4),
    'IIImaj7': `${this.getNote(root, 4)}maj7`,
    'IIImaj9': `${this.getNote(root, 4)}maj9`,

    'IV': this.getNote(root, 5),
    'IV7': `${this.getNote(root, 5)}7`,
    'IV9': `${this.getNote(root, 5)}9`,
    'IV11': `${this.getNote(root, 5)}11`,

    'V': this.getNote(root, 7),
    'V7': `${this.getNote(root, 7)}7`,
    'V9': `${this.getNote(root, 7)}9`,
    'V11': `${this.getNote(root, 7)}11`,
    'V13': `${this.getNote(root, 7)}13`,
    'v': `${this.getNote(root, 7)}m`,

    'vi': `${this.getNote(root, 9)}m`,
    'vi11': `${this.getNote(root, 9)}m11`,
    'VI': this.getNote(root, 9),
    'VImaj7': `${this.getNote(root, 9)}maj7`,
    'VImaj9': `${this.getNote(root, 9)}maj9`,

    'VII': this.getNote(root, 11),
    'bVII': this.getNote(root, 10),
    'bIII': this.getNote(root, 3),
    'bVI': this.getNote(root, 8)
  };

  return progression.map(chord => chordMap[chord] || root).join(' ');
}

  /**
   * Calculates a note at a given interval from the root
   * @param root - Root note name
   * @param semitones - Number of semitones to transpose
   * @returns Transposed note name
   */
  getNote(root: string, semitones: number): string {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const normalizedRoot = this.normalizeNote(root);
    const rootIndex = noteNames.indexOf(normalizedRoot);
    if (rootIndex === -1) return root;
    return noteNames[(rootIndex + semitones) % 12];
  }
  
  /**
   * Generates a Euclidean rhythm pattern
   * @param hits - Number of hits/beats in the pattern
   * @param steps - Total number of steps in the pattern
   * @returns Space-separated string of '1' (hit) and '~' (rest)
   * @throws {Error} When hits exceed steps
   */

  generateEuclideanRhythm(hits: number, steps: number): string {
  if (!Number.isInteger(hits) || !Number.isInteger(steps)) {
    throw new Error('Hits and steps must be integers');
  }

  if (hits < 0) {
    throw new Error('Hits cannot be negative');
  }

  if (steps <= 0) {
    throw new Error('Steps must be greater than 0');
  }

  if (hits > steps) {
    throw new Error('Hits cannot exceed steps');
  }

  // Explicit zero-hits behavior: valid pattern with only rests
  if (hits === 0) {
    return new Array(steps).fill('~').join(' ');
  }

  const pattern: boolean[] = new Array(steps).fill(false);
  const interval = steps / hits;

  for (let i = 0; i < hits; i++) {
    const index = Math.floor(i * interval);
    pattern[index] = true;
  }

  return pattern.map(hit => (hit ? '1' : '~')).join(' ');
}
  /**
   * Generates a polyrhythm from two Euclidean patterns
   * @param pattern1 - Number of hits for first rhythm
   * @param pattern2 - Number of hits for second rhythm
   * @param length - Total length of patterns (default: 16)
   * @returns Formatted polyrhythm string
   */
  generatePolyrhythm(pattern1: number, pattern2: number, length: number = 16): string {
    const rhythm1 = this.generateEuclideanRhythm(pattern1, length);
    const rhythm2 = this.generateEuclideanRhythm(pattern2, length);
    return `[${rhythm1}], [${rhythm2}]`;
  }

  /**
   * Gets scale notes with octave numbers
   * @param root - Root note of the scale
   * @param scaleName - Type of scale to generate
   * @param octave - Octave number (default: 3)
   * @returns Array of notes with octave numbers (e.g., ['c3', 'd3', 'e3'])
   */
  getScaleNotes(root: string, scaleName: keyof typeof this.scales, octave: number = 3): string[] {
    const scale = this.generateScale(root, scaleName);
    return scale.map(note => `${note.toLowerCase()}${octave}`);
  }

  /**
   * Generates an arpeggio pattern from a chord
   * @param chord - Chord name to arpeggiate
   * @param pattern - Arpeggio pattern ('up', 'down', 'updown', 'random')
   * @returns Space-separated string of notes in arpeggio order
   */
  generateArpeggio(chord: string, pattern: string = 'up'): string {
    const patterns: Record<string, number[]> = {
      'up': [0, 1, 2, 3],
      'down': [3, 2, 1, 0],
      'updown': [0, 1, 2, 3, 2, 1],
      'random': [0, 2, 1, 3, 0, 3, 1, 2]
    };
    
    const arpPattern = patterns[pattern] || patterns['up'];
    const notes = this.getChordNotes(chord);
    
    return arpPattern
      .map(index => notes[index % notes.length])
      .join(' ');
  }

  /**
   * Extracts individual notes from a chord name
   * Parses chord symbols and returns note names with octave numbers
   * @param chord - Chord name to parse (e.g., 'Cmaj7', 'Am', 'G7')
   * @returns Array of note names with octave numbers (e.g., ['c3', 'e3', 'g3'])
   * @example
   * const notes = this.getChordNotes('Cmaj7');
   * // Returns: ['c3', 'e3', 'g3', 'b3']
   */
  private getChordNotes(chord: string): string[] {
    const parsed = chord.trim().match(/^([A-Ga-g])([#b]?)(.*)$/);
    if (!parsed) return ['c3', 'e3', 'g3'];

    const root = this.normalizeNote(`${parsed[1].toUpperCase()}${parsed[2] || ''}`);
    const cleanedType = (parsed[3] || '').replace(/\s+/g, '');
    // Preserve jazz chart major notation (M7/M9/M11/M13) before lowercasing.
    const normalizedType = cleanedType.match(/^M(7|9|11|13)$/)
      ? `maj${cleanedType.slice(1)}`
      : cleanedType.toLowerCase();
    const aliases: Record<string, string> = {
      '': '',
      maj: '',
      major: '',
      major7: 'maj7',
      major9: 'maj9',
      major11: 'maj11',
      major13: 'maj13',
      min: 'm',
      '-': 'm',
      '-7': 'm7',
      '-9': 'm9',
      '-11': 'm11',
      '-13': 'm13',
      min7: 'm7',
      min9: 'm9',
      min11: 'm11',
      min13: 'm13',
      dom7: '7',
      dom9: '9',
      dom11: '11',
      dom13: '13'
    };
    const type = aliases[normalizedType] ?? normalizedType;

    const intervals: Record<string, number[]> = {
      '': [0, 4, 7], // major
      'm': [0, 3, 7], // minor
      '7': [0, 4, 7, 10], // dominant 7
      'maj7': [0, 4, 7, 11], // major 7
      'm7': [0, 3, 7, 10], // minor 7
      '9': [0, 4, 7, 10, 14], // dominant 9
      'maj9': [0, 4, 7, 11, 14], // major 9
      'm9': [0, 3, 7, 10, 14], // minor 9
      '11': [0, 4, 7, 10, 14, 17], // dominant 11
      'maj11': [0, 4, 7, 11, 14, 17], // major 11
      'm11': [0, 3, 7, 10, 14, 17], // minor 11
      '13': [0, 4, 7, 10, 14, 21], // dominant 13
      'maj13': [0, 4, 7, 11, 14, 21], // major 13
      'm13': [0, 3, 7, 10, 14, 21], // minor 13
      'dim': [0, 3, 6], // diminished
      'aug': [0, 4, 8] // augmented
    };

    const chordIntervals = intervals[type] || intervals[''];
    return chordIntervals.map(interval => {
      const note = this.getNote(root, interval);
      const octave = 3 + Math.floor(interval / 12);
      return `${note.toLowerCase()}${octave}`;
    });
  }
}
