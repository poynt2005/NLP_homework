from fsa import fsa
s = {'John' : 'n' , 'put' : 'v' , 'a' : 'article' , 'book' : 'n' ,
     'on' : 'adv' , 'table' : 'n' , 'in' : 'adv' , 'classroom' : 'n' ,
     'the' : 'article' , 'science' : 'adj' , 'building' : 'n' , 'campus' : 'n'}

input1 = 'John put a book on the table'.split(' ')
input2 = 'John put a book on the table in the classroom'.split(' ')
input3 = 'John put a book on the table in the classroom in the science building'.split(' ')
input4 = 'John put a book on the table in the classroom in the science building on campus'.split(' ')


n = {'s0' : {'n' : 's1'},
     's1' : {'v' : 's2'},
     's2' : {'article' : 's3'},
     's3' : {'n' : 's4'},
     's4' : {'adv' : 's5'},
     's5' : {'article' : 's6' , 'n' : 's8'},
     's6' : {'adj' : 's7' , 'n' : 's8'},
     's7' : {'n' : 's8'},
     's8' : {'adv' : 's5'}
    }

a = fsa(n , 's0' , 's8' , s)
print('\n'.join(a.parse(input1)))
print('\n'.join(a.parse(input2)))
print('\n'.join(a.parse(input3)))
print('\n'.join(a.parse(input4)))
