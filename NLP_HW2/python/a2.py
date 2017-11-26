import re
#question 2
class fsa:
    def __init__(self , transition , start_state):
        self.transition = transition
        self.start_state = start_state
    def parse(self , input_arr):
        _state_info = []
        _trans = self.transition
        state = self.start_state
        for i in input_arr :
            info = ''
            info = info + ('Current state : %s' % (state))
            state = _trans[state][i]
            info = info + (" ,Next state : %s" % (state))
            _state_info.append(info)
        if state == 's2' :
          _state_info.append("Done!")
          _state_info.append("ian")
        elif state == 's3':
          _state_info.append("Done!")
          _state_info.append("an")
        return _state_info

def parseRawArray(rawText):
    rawText = rawText.lower()
    test_pinyin = []
    ian_re = re.compile("ian$")
    if ian_re.search(rawText):
        replacedIan = ian_re.sub('' , rawText)
        if replacedIan:
            test_pinyin = replacedIan
            test_pinyin = list(test_pinyin)
        test_pinyin.append("i")
        test_pinyin.append("an")
    else :
        an_re = re.compile("an$")
        if an_re.search(rawText):
            replacedAn = an_re.sub('' , rawText)
            if replacedAn:
                test_pinyin = replacedAn
                test_pinyin = list(test_pinyin)
            test_pinyin.append("an")
        elif not rawText:
            print('Please insert pinyin')
        else:
            print('not find')
    return test_pinyin

def answer2():
    trans = {
                 's0' : {'a' : 's0' , 'b' : 's0' , 'c' : 's0' , 'd' : 's0' , 'e' : 's0' , 'f' : 's0' , 'g' : 's0' , 'h' : 's0' ,
                         'j' : 's0' , 'k' : 's0' , 'l' : 's0' , 'm' : 's0' , 'n' : 's0' , 'o' : 's0' , 'p' : 's0' , 'q' : 's0' ,
                         'r' : 's0' , 's' : 's0' , 't' : 's0' , 'u' : 's0' , 'v' : 's0' , 'w' : 's0' , 'x' : 's0' , 'y' : 's0' , 'z' : 's0',
                         'i' : 's1' , 'an' : 's3'
                       },
                 's1' : {'a' : 's0' , 'b' : 's0' , 'c' : 's0' , 'd' : 's0' , 'e' : 's0' , 'f' : 's0' , 'g' : 's0' , 'h' : 's0' ,
                         'j' : 's0' , 'k' : 's0' , 'l' : 's0' , 'm' : 's0' , 'n' : 's0' , 'o' : 's0' , 'p' : 's0' , 'q' : 's0' ,
                         'r' : 's0' , 's' : 's0' , 't' : 's0' , 'u' : 's0' , 'v' : 's0' , 'w' : 's0' , 'x' : 's0' , 'y' : 's0' , 'z' : 's0',
                         'i' : 's0' , 'an' : 's2'
                        }
            }
    pinyin_parse = fsa(trans , 's0')
    input_str = input('please input pinyin withont tone :')
    result = pinyin_parse.parse(parseRawArray(input_str))
    if result.pop() == 'an':
        print('an rhythm' , result , sep = ' ')
    else:
        print('ian rhythm' , result , sep = ' ')

#question 3
class fst:
    def __init__(self , transition , outTransition , start_state , fin_state , speech_list = None):
        self.transition = transition
        self.outTransition = outTransition
        self.start_state = start_state
        self.fin_state = fin_state
        self.speech_list = speech_list
    def parse(self , input_arr):
        _state_info = []
        _trans = self.transition
        _out_trans = self.outTransition
        _state = self.start_state
        _speech_list = self.speech_list
        for i in input_arr:
            info = ''
            info = info + ("Current state : %s" % (_state))
            info = info + (" ,Current input : %s" % (i))
            currentState = _state
            if _speech_list:
                _state = _trans[_state][_speech_list[i]]
            else :
                _state = _trans[_state][i]
            output = ''
            if _speech_list:
                output = _out_trans[currentState][_speech_list[i]]
            else:
                output = _out_trans[currentState][i]
            info = info + (" ,Current output : %s" % (output));
            info = info + (" ,Next state : %s" % (_state));
            _state_info.append(info);
        if isinstance(self.fin_state , tuple):
            for i in self.fin_state:
                if _state == i:
                    _state_info.append('Done!')
                    return _state_info
        else:
            if _state == self.fin_state:
                _state_info.append('Done!')
                return _state_info
        _state_info.append('Failed!')
        return _state_info

def testFstParse(input_string , fsaTrans , otrans , globalOtrans ,start_state, fin_state , recursive_determine_arc , recursive_times):
    _state_info = []
    input_array = input_string.split(" ")
    _state = start_state
    recursive_re = re.compile("_r")
    currentOutputTransition = otrans.pop(0);
    for i in input_array:
        info = ""
        info = info + ("Current state : %s" % (_state))
        current_input = recursive_re.sub('' , i)
        info = info + (" ,Current input : %s" % (current_input))
        currentState = _state
        output = ''
        if i == recursive_determine_arc:
            currentOutputTransition = otrans.pop(0)
            recursive_times -= 1
            output = currentOutputTransition[_state][i]
        else :
            if not recursive_times:
                currentOutputTransition.update(globalOtrans)
            output = currentOutputTransition[_state][i]
        _state = fsaTrans[_state][i]
        info = info + (" ,Current output : %s" % (output))
        info = info + (" ,Next state : %s" % (_state))
        _state_info.append(info)
    if isinstance(fin_state , tuple):
        for i in fin_state:
            if _state == i:
                _state_info.append('Done!')
                return _state_info
    else:
        if _state == fin_state:
            _state_info.append('Done!')
            return _state_info
    _state_info.append('Failed!')
    return _state_info

def answer3_a(input_str):
    tmp = input_str.replace('@' , '').split(' ')
    arr = [i for i in tmp if i]
    pronounTransition = {
        's0' : {'article' : 's1'},
        's1' : {'noun' : 's2'},
        's2' : {'verb' : 's3' , 'pronoun' : 's5'},
        's3' : {'pronoun' : 's4'},
        's4' : {'verb' : 's7'},
        's5' : {'verb' : 's6'},
        's6' : {'verb' : 's7'},
        's7' : {'adjective' : 's8'},
        's8' : {'noun' : 's9'}
    }
    outputTransition = {
        's0' : {'article' : 'NULL'},
        's1' : {'noun' : 'NULL'},
        's2' : {'verb' : 'who' , 'pronoun' : 'NULL'},
        's3' : {'pronoun' : 'NULL'},
        's4' : {'verb' : 'NULL'},
        's5' : {'verb' : 'whom'},
        's6' : {'verb' : 'NULL'},
        's7' : {'adjective' : 'NULL'},
        's8' : {'noun' : 'NULL'}
    }
    partOfSpeechList = {
        'the' : 'article',
        'The' : 'article',
        'girl' : 'noun',
        'called' : 'verb',
        'you' : 'pronoun',
        'is' : 'verb',
        'my' : 'adjective',
        'friend' : 'noun'
    }
    fstCheck = fst(pronounTransition , outputTransition , 's0' , 's9' , partOfSpeechList)
    result = fstCheck.parse(arr)
    return result

def answer3_b(flag):
    oTrans1 = {
        's0' : {'pronoun' : 'I'},
        's1' : {'verb' : 'know'},
        's2' : {'pronoun' : 'that'}
    }
    rOTrans1  = {
        's3' : {'pronoun_r' : 'I'},
        's1' : {'verb' : 'know'},
        's2' : {'pronoun' : 'that'}
    }
    oTrans2 = {
        's0' : {'pronoun' : 'He'},
        's1' : {'verb' : 'thinks'},
        's2' : {'pronoun' : 'that'}
    }
    rOTrans2 = {
        's3' : {'pronoun_r' : 'He'},
        's1' : {'verb' : 'thinks'},
        's2' : {'pronoun' : 'that'}
    }
    oTrans3 = {
        's0' : {'pronoun' : 'She'},
        's1' : {'verb' : 'believes'},
        's2' : {'pronoun' : 'that'}
    }
    gTrans = {
        's3' : {'pronoun' : 'he'},
        's4' : {'verb' : 'is'},
        's5' : {'adjective' : 'smart'}
    }
    transition = {
        's0' : {'pronoun' : 's1'},
        's1' : {'verb' : 's2'},
        's2' : {'pronoun' : 's3'},
        's3' : {'pronoun_r' : 's1' , 'pronoun' : 's4'},
        's4' : {'verb' : 's5'},
        's5' : {'adjective' : 's6'}
    }
    a_3_2 = 'pronoun verb pronoun pronoun verb adjective'
    b_3_2 = 'pronoun verb pronoun pronoun_r verb pronoun pronoun verb adjective'
    c_3_2 = 'pronoun verb pronoun pronoun_r verb pronoun pronoun_r verb pronoun pronoun verb adjective'

    if flag == 0:
        recursive_times = 0
        result = testFstParse(a_3_2 , transition , [oTrans1] , gTrans , 's0' , 's6' , 'pronoun_r' , recursive_times)
        print('pronoun verb pronoun pronoun verb adjective' , ':' , sep = ' ')
        print('\n'.join([str(i) for i in result]) ,sep = '\n')

    elif flag == 1:
        recursive_times = 1
        result = testFstParse(b_3_2 , transition , [oTrans2 , rOTrans1] , gTrans , 's0' , 's6' , 'pronoun_r' , recursive_times)
        print('pronoun verb pronoun pronoun verb pronoun pronoun verb adjective' , ':' , sep = ' ')
        print('\n'.join([str(i) for i in result]) ,sep = '\n')

    elif flag == 2:
        recursive_times = 2
        result = testFstParse(c_3_2 , transition , [oTrans3 , rOTrans2 , rOTrans1] , gTrans , 's0' , 's6' , 'pronoun_r' , recursive_times)
        print('pronoun verb pronoun pronoun verb pronoun pronoun verb pronoun pronoun verb adjective' , ':' , sep = ' ')
        print('\n'.join([str(i) for i in result]) ,sep = '\n')

def answer3_c(flag):
    transition = {
        's0' : {'article' : 's1'},
        's1' : {'noun' : 's2'},

        's2' : {'preposition' : 's3'},
        's3' : {'adjective' : 's4' , 'noun' : 's6'},
        's4' : {'noun' : 's5'},
        's5' : {'preposition_r' : 's3'}
    }
    oTrans1 = {
        's0' : {'article' : 'a'},
        's1' : {'noun' : 'student'},

        's2' : {'preposition' : 'in'},
        's3' : {'adjective' : 'blue'},
        's4' : {'noun' : 'jeans'}
    }
    rOTrans2 = {
        's5' : {'preposition_r' : 'with'},
        's3' : {'adjective' : 'long'},
        's4' : {'noun' : 'hair'}
    }
    rOTrans3 = {
        's5' : {'preposition_r' : 'on'},
        's3' : {'noun' : 'campus'}
    }
    gTrans = {}
    oTransArray = []
    recursive_times = 0

    if flag == 0 :
        recursive_times = 0
        oTransArray.append(oTrans1)
        input_string = 'article noun preposition adjective noun'

    elif flag == 1 :
        recursive_times = 1
        oTransArray.append(oTrans1)
        oTransArray.append(rOTrans2)
        input_string = 'article noun preposition adjective noun preposition_r adjective noun'

    elif flag == 2 :
        recursive_times = 2
        oTransArray.append(oTrans1)
        oTransArray.append(rOTrans2)
        oTransArray.append(rOTrans3)
        input_string = 'article noun preposition adjective noun preposition_r adjective noun preposition_r noun'
    result = testFstParse(input_string , transition , oTransArray , gTrans , 's0' , ('s5' , 's6') , 'preposition_r' , recursive_times);
    return result

def main():
    #answer 2
    answer2()
    print()

    #anser 3-a
    sentence3_1 = 'The girl @ called you is my friend'
    sentence3_2 = 'The girl @ you called is my friend'

    print('question 3-a')
    print('sentense 3-a-1 : The girl who called you is my friend : ')
    print('\n'.join([str(i) for i in answer3_a(sentence3_1)]) ,sep = '\n')
    print()
    print('sentense 3-a-2 : The girl whom you called is my friend :')
    print('\n'.join([str(i) for i in answer3_a(sentence3_2)]) ,sep = '\n')
    print()

    #answer3-b
    print('I know that he is smart : ')
    answer3_b(0)
    print()

    print('He thinks that I know that he is smart : ')
    answer3_b(1)
    print()

    print('She believes that he thinks that I know that he is smart : ')
    answer3_b(2)
    print()

    #answer 3-c
    print('a student in blue jeans : article noun preposition adjective noun')
    print('\n'.join([str(i) for i in answer3_c(0)]) ,sep = '\n')
    print()

    print('a student in blue jeans with long hair : article noun preposition adjective noun preposition adjective noun')
    print('\n'.join([str(i) for i in answer3_c(1)]) ,sep = '\n')
    print()

    print('a student in blue jeans with long hair on campus : article noun preposition adjective noun preposition adjective noun preposition noun')
    print('\n'.join([str(i) for i in answer3_c(2)]) ,sep = '\n')
    print()

if __name__ == '__main__':
    main()
