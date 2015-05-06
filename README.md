# RTC

## Book to midi
Creates a live midi output from the text of a book, very naively.
Currently:

- 1 sentence = 1 note.
- Length of note: Sentence length / {modifier}
- Pitch of note: 5 * nouns + 2 * verbs + adjectives + {modifier}
- "Velocity (volume)" of note: length of note + {modifier}

### Install
1. `pip install -U nltk`
2. Open python console.
`import nltk`
`nltk.download()`
3. install gutenberg package.
4. `pip install -U rtmidi`
5. Download [http://notahat.com/simplesynth/](SimpleSynth).

### Run
1. Open SimpleSynch.
6. `python rtc.py`
