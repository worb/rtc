import nltk
from nltk.corpus import gutenberg

import time
import rtmidi

def score(text):
    notes = []
    sents = gutenberg.sents(text)

    for sent in sents[100:200]:
        #note is [length of sentence, number of nouns, number of verbs, number of adjectives].
        note = [len(sent), 0, 0, 0]
        notes.append(note)

        pos = nltk.pos_tag(sent)

        for word in pos:
            part = word[1][0]
            if part == 'N':
                note[1] += 1
            elif part == 'V':
                note[2] += 1
            elif part == 'J':
                note[3] += 1

    return notes

sheet = score('melville-moby_dick.txt')

midiout = rtmidi.MidiOut()
available_ports = midiout.get_ports()

if available_ports:
    midiout.open_port(0)
else:
    midiout.open_virtual_port("My virtual output")

for note in sheet:

    midi_note = (5 * note[1]) + (2 * note[2]) + (note[3]) + 21
    #midi_note = 1
    velocity = note[0] + 100
    sleep = note[0] * .02

    note_on = [0x90, midi_note, velocity] # channel, midi note (0 - 108), velocity

    print note_on
    note_off = [0x80, midi_note + 20, 0]

    midiout.send_message(note_on)

    time.sleep(sleep)

    midiout.send_message(note_off)

del midiout
