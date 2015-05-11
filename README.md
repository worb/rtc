# RTC

## book2midi

### Install

1. Install dependencies with `pip install -r depends.txt`
2. Open the NLTK package manager, like this:

        import nltk
        nltk.download()

    1. Install gutenberg package from the Corpora tab.
    2. Install punkt package from the Models tab.
3. Download [SimpleSynth](http://notahat.com/simplesynth/).

### Run
1. Open SimpleSynth.
2. `python rtc.py`

### About

Creates a live midi output from the text of a book, very naively.

Currently:

- Uses only sentences 100:200.
- 1 sentence = 1 note.
- Length of note: Sentence length / {modifier}
- Pitch of note: 5 * nouns + 2 * verbs + adjectives + {modifier}
- "Velocity (volume)" of note: length of note + {modifier}

Future:

- Use whole book.
- Do all of that a lot more thoughtfully.

Some thoughts:

- It doesn't necessarily have to be one note or chord per sentence. Some sentences may be deserving of a few.
- We should think about what characteristics of a sentence translate musically. What features can we detect that translate to tone, rhythm, volume, and so on, and then use those to create something. For example, I think of punctuation plus meter as defining the rhythm of the sentence. We should translate that into the drumline of the note/chord.
- The standard piano range is MIDI note 21 - 109. We should do some analysis of the range of various features of the book text to distribute notes accordingly. We could even vary the math by sentence to produce specific moods based on characteristics.
- We're not limited to one voice. You can play notes more or less simultaneously, and through different channels, which can be set to different instruments (although not programatically). Thus, each sentence could be not a note, but a chord, or even multiple voices.
- NLTK provides lots of other analysis tools that we could rely on to inform and enhance the notes.
