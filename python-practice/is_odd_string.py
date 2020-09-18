def is_odd_string(word):
    """Is the sum of the character-positions odd?
    Word is a simple word of uppercase/lowercase letters without punctuation.
        >>> is_odd_string('a')
        True
        >>> is_odd_string('A')
        True
    These sum to 4, which is not odd:
        >>> is_odd_string('aaaa')
        False
        >>> is_odd_string('AAaa')
        False
    Longer example:
        >>> is_odd_string('amazing')
        True
    """
    evens = []
    if len(word) %2 ==0:
        print(False);
    else:
        print(True);
is_odd_string('AAaaa')
    # Hint: you may find the ord() function useful here