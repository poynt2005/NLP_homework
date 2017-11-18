from fsa import fsa
s = {
        'John' : 'n', 'knows' : 'v' , 'that' : 'pron' , 'he' : 'pron',
        'is' : 'v' , 'very' : 'adv' , 'smart' : 'adj' ,
        'Mary' : 'n' , 'thinks' : 'v' , 
        'Sue' : 'n' , 'believes' : 'v' ,
        'Sam' : 'n' , 'realizes' : 'v'
    }

n = {
        's0' : {'n' : 's1'},
        's1' : {'v' : 's2'},
        's2' : {'pron' : 's3'},
        's3' : {'n' : 's1' , 'pron' : 's3' , 'v' : 's4'},
        's4' : {'adj' : 's6' , 'adv' : 's5'},
        's5' : {'adj' : 's6'},
        's6' : ''
    }

input1 = 'John knows that he is very smart'.split(' ')
input2 = 'Mary thinks that John knows that he is very smart'.split(' ')
input3 = 'Sue believes that Mary thinks that John knows that he is very smart'.split(' ')
input4 = 'Sam realizes that Sue believes that Mary thinks that John knows that he is smart'.split(' ')


a = fsa(n , 's0' , 's6' , s)
print('\n'.join(a.parse(input1)))
print('\n'.join(a.parse(input2)))
print('\n'.join(a.parse(input3)))
print('\n'.join(a.parse(input4)))

