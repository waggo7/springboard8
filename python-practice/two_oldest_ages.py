def two_oldest_ages(ages):
    """Return two distinct oldest ages as tuple (second-oldest, oldest)..

        >>> two_oldest_ages([1, 2, 10, 8])
        (8, 10)

        >>> two_oldest_ages([6, 1, 9, 10, 4])
        (9, 10)

    Even if more than one person has the same oldest age, this should return
    two *distinct* oldest ages:

        >>> two_oldest_ages([1, 5, 5, 2])
        (2, 5)
    """
    # first = [num for num in ages if num == max(ages)]
    # two_ages = set(ages);
    # oldest = ""
    # next_oldest = ""
    
    # for num in two_ages:
    #     if oldest is None or num > oldest:
    #         next_oldest = oldest
    #         oldest = num
    #     elif next_oldest is None:
    #         next_oldest = num
    # print(oldest, next_oldest)
    uniq_ages = set(ages)
    oldest = sorted(uniq_ages)[-2:]
    return tuple(oldest)
    
    # NOTE: don't worry about an optimized runtime here; it's fine if
    # you have a runtime worse than O(n)

    # NOTE: you can sort lists with lst.sort(), which works in place (mutates);
    # you may find it helpful to research the `sorted(iter)` function, which
    # can take *any* type of list-like-thing, and returns a new, sorted list
    # from it.
two_oldest_ages([6, 1, 9, 10, 4])