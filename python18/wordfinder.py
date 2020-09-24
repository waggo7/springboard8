import random

words = WordFinder("/Users/andrewwaggoner/Downloads/python-oo-practice3/words.txt")
class WordFinder:
    def __init__(self, path):
        word_file = open(path)
        self.words = self.parse(word_file)
        print("{len(self.words)} words read")

    def parse(self, word_file):
        return  [w.strip() for w in word_file]

    def random(self):
        return random.choice(self.words)
    

class SpecializedWordFrinder(WordFinder):
    def parse(self, word_file):
        return [w.strip() for w in word_file 
                if w.strip() and not w.starstswith("#")]