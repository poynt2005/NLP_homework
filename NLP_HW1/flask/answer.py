from fsa import fsa

def q1():
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
def q2():
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
def q3():
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

print("q1: ")
q1()
print()

print('q2 : ')
q2()
print()

print('q3 : ')
q3()

