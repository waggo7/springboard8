def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """
    for word in phrase:
        if word.isupper():
            result_word = (word.lower())
            print(result_word);
        else:
            print(word.upper());
titleize('oNLy cAPITALIZe fIRSt')