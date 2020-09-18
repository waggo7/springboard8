def list_check(lst):
    """Are all items in lst a list?

        >>> list_check([[1], [2, 3]])
        True

        >>> list_check([[1], "nope"])
        False
    """
    
    if type(lst) == list(lst):
          print("True");
    else:
         print("False")
list_check([[1], [2, 3]])
