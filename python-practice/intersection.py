def intersection(l1, l2):
    """Return intersection of two lists as a new list::
    
        >>> intersection([1, 2, 3], [2, 3, 4])
        [2, 3]
        
        >>> intersection([1, 2, 3], [1, 2, 3, 4])
        [1, 2, 3]
        
        >>> intersection([1, 2, 3], [3, 4])
        [3]
        
        >>> intersection([1, 2, 3], [4, 5, 6])
        []
    """
    # setofList1 = set(l1)
    # setofList2 = set(l2)
    return_list = [value for value in l1 if value in l2]
    print(return_list);

intersection([1, 2, 3], [2, 3, 4])