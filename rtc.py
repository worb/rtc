#!/usr/bin/env python
# -*- coding: utf-8 -*-

import nltk
import rtmidi
import time

def play(out, note, ch, vel, sleep):

    # 143 and 127 are ((MIDI channel 1 hex value) - 1)
    # for turning a note on, and off respectively
    # Thus, 143 + channel N = MIDI channel N

    channel_on = 143 + ch
    channel_off = 127 + ch
    note_on = [channel_on, note, vel]
    note_off = [channel_off, note, vel]
    out.send_message(note_on)
    time.sleep(sleep)
    out.send_message(note_off)

def score(text):
    notes = []
    sents = nltk.corpus.gutenberg.sents(text)
    for sent in sents[100:200]:
        # Note = [sentence length, noun count, verb count, adjective count]
        note = [len(sent), 0, 0, 0]
        notes.append(note)
        pos = nltk.pos_tag(sent)
        for word in pos:
            part = word[1][0]

            # Interperets return from POS tagger
            # N = noun
            # V = verb
            # J = adjective

            if part == 'N':
                note[1] += 1
            elif part == 'V':
                note[2] += 1
            elif part == 'J':
                note[3] += 1
    return notes

def main():
    in_ = 'melville-moby_dick.txt'
    out = rtmidi.MidiOut()
    sheet = score(in_)
    available_ports = out.get_ports()
    if available_ports:
        out.open_port(0)
    else:
        out.open_virtual_port("My virtual output")
    for note in sheet:
        midi_note = (5 * note[1]) + (2 * note[2]) + (note[3]) + 21
        velocity = note[0] + 100
        sleep = note[0] * .02
        play(out, midi_note, 2, velocity, sleep)
    del out

if __name__ == "__main__":
    main()
