def freq_counter(coll):
    freq= {}
    for item in coll:
        freq[item] = freq.get(item, 0) +1
        return freq;

def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    print(freq_counter(str(num1)) == freq_counter(str))
    
   
same_frequency(1212, 2211)