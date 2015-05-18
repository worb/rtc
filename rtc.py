#!/usr/bin/env python
# -*- coding: utf-8 -*-

# import matplotlib.pyplot as p
import nltk
from nltk.collocations import *
from wavelen2rgb import wavelen2rgb

def find_bigrams(text):
    bigram_measures = nltk.collocations.BigramAssocMeasures()
    trigram_measures = nltk.collocations.TrigramAssocMeasures()

    # change this to read in your data
    finder = BigramCollocationFinder.from_words(nltk.corpus.gutenberg.words(text))

    # only bigrams that appear 3+ times
    finder.apply_freq_filter(3)

    # return the 10 n-grams with the highest PMI
    return finder.nbest(bigram_measures.pmi, 10)

def find_paras(all_bigrams, text):
    paras_found = []
    paras = nltk.corpus.gutenberg.paras(text)
    for para in paras:
        for sent in para:
            bigram_list = list(nltk.bigrams(sent))
            for one_bigram in all_bigrams:
                if one_bigram in bigram_list:
                    paras_found.append(para)
                    break
                    
    print paras_found


def score(text):
    notes = []
    sents = nltk.corpus.gutenberg.sents(text)
    for sent in sents[100:118]:
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
    in_ = 'carroll-alice.txt'
    html_out = 'background: linear-gradient(180deg, '
    bigrams = find_bigrams(in_)
    find_paras(bigrams, in_)
    ''' wave_range = range(378,781)
    for note in sheet:
        # very naively transposes the note to an index between 1 and 400,
        # the number of rbg wavelengths in the wave2rbg function.
        wave_index = int(round(400 * ((note[1] + note[2] + note[3]) / 100.0)))
        wavelen = wave_range[wave_index]
        rgb = wavelen2rgb(wavelen)
        html_out += "rgba(" + str(rgb[0]) + ", " + str(rgb[1]) + ", " + str(rgb[2]) + ", 1), "
    html_out += ');'
    print html_out'''
if __name__ == "__main__":
    main()
