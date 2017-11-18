from fsa import fsa
s = {'John' : 'n' , 'read' : 'v' , 'a' : 'article' , 'book' : 'n' ,
     'that' : 'pron' , 'the' : 'article' , 'famous' : 'adj' , 'writer' : 'n' ,
     'many' : 'adj' , 'students' : 'n' , 'liked' : 'v' , 'wrote' : 'v' , 'respected' : 'v',
     'my' : 'pron' , 'superviser' : 'n' , 'taught' : 'v' , 'colleagues' : 'n' ,
     }



input1 = 'John read a book'.split(' ')
input2 = 'John read a book that the famous writer wrote'.split(' ')
input3 = 'John read a book that the famous writer that many students liked wrote'.split(' ')
input4 = 'John read a book that the famous writer that many students that my superviser taught liked wrote'.split(' ')
input5 = 'John read a book that the famous writer that many students that my superviser that many colleagues respected taught liked wrote'.split(' ')



n = {
    's0' : {'n' : 's1'},
    's1' : {'v' : 's2'},
    's2' : {'article' : 's3'},
    's3' : {'n' : 's4'},
    's4' : {'pron' : 's5'},
    's5' : {'pron' : 's5' , 'article' : 's6' ,  'adj' : 's7' , 'n' : 's8'},
    's6' : {'adj' : 's7'},
    's7' : {'n' : 's8'},
    's8' : { 'v' : 's9' , 'pron' : 's5'},
    's9' : {'v' : 's9'}
    }

a = fsa(n , 's0' , ('s4' , 's9') , s)
print('\n'.join(a.parse(input1)))
print('\n'.join(a.parse(input2)))
print('\n'.join(a.parse(input3)))
print('\n'.join(a.parse(input4)))
print('\n'.join(a.parse(input5)))

