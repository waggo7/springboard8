def any7(nums):
    for num in nums:
        if num == 7:
            return True;
        else:
            return False;
    

print("should be true", any7([1, 2, 7, 4, 5]))
print("should be false", any7([1, 2, 4, 5]))

