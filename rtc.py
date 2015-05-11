import nltk
import time
import rtmidi

def play(note, ch, vel, length):

    channel_on = 143 + ch
    channel_off = 127 + ch

    note_on = [channel_on, note, velocity]
    note_off = [channel_off, note, velocity]

    midiout.send_message(note_on)
    time.sleep(length)
    midiout.send_message(note_off)


def score(text):
    notes = []
    sents = nltk.corpus.gutenberg.sents(text)

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
    velocity = note[0] + 100
    sleep = note[0] * .02

    play(midi_note, 2, velocity, sleep)

del midiout
