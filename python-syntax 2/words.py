def print_upper_words(words):
  for word in words:
        print(word.upper())


print_upper_words([words], must_start_with={"h", "y"})
def print_upper_words1(words):
    for word in words:
        if word.startswith("e") or word.startswith("E"):
            print(word.upper())

def print_upper_words2(words, must_start_with):
    for word in words:
        for letter in must_start_with:
            if word.startswith(letter):
                print(word.letter)
                break

            