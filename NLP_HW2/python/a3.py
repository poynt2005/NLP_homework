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

def fstForSpecialParse(input_string , flag):
    input_array = input_string.split(" ")

    if flag == 0 :
        transition1 = {
  			's0' : {'pronoun' : 's1'},
  			's1' : {'verb' : 's2'},
  			's2' : {'pronoun' : 's3'},
  			's3' : {'pronoun' : 's4'},
  			's4' : {'verb' : 's5'},
  			's5' : {'adjective' : 's6'}
  		}

        oTrans1 = {
  			's0' : {'pronoun' : 'I'},
  			's1' : {'verb' : 'know'},
  			's2' : {'pronoun' : 'that'},
  			's3' : {'pronoun' : 'he'},
  			's4' : {'verb' : 'is'},
  			's5' : {'adjective' : 'smart'}
  		}

        parseFlag1 = fst(transition1 , oTrans1 , 's0' , 's6')
        return parseFlag1.parse(input_array)

    elif flag == 1 :
        transition2 = {
  			's0' : {'pronoun' : 's1'},
  			's1' : {'verb' : 's2'},
  			's2' : {'pronoun' : 's3'},
  			's3' : {'pronoun' : 's4'},
  			's4' : {'verb' : 's5'},
  			's5' : {'pronoun' : 's6'},
  			's6' : {'pronoun' : 's7'},
  			's7' : {'verb' : 's8'},
  			's8' : {'adjective' : 's9'}
  		}

        oTrans2 = {
  			's0' : {'pronoun' : 'He'},
  			's1' : {'verb' : 'thinks'},
  			's2' : {'pronoun' : 'that'},
  			's3' : {'pronoun' : 'I'},
  			's4' : {'verb' : 'know'},
  			's5' : {'pronoun' : 'that'},
  			's6' : {'pronoun' : 'he'},
  			's7' : {'verb' : 'is'},
  			's8' : {'adjective' : 'smart'}
  		}

        parseFlag2 = fst(transition2 , oTrans2 , 's0' , 's9')
        return parseFlag2.parse(input_array)

    else:
        transition3 = {
    			's0' : {'pronoun' : 's1'},
    			's1' : {'verb' : 's2'},
    			's2' : {'pronoun' : 's3'},
    			's3' : {'pronoun' : 's4'},
    			's4' : {'verb' : 's5'},
    			's5' : {'pronoun' : 's6'},
    			's6' : {'pronoun' : 's7'},
    			's7' : {'verb' : 's8'},
    			's8' : {'pronoun' : 's9'},
    			's9' : {'pronoun' : 's10'},
    			's10' : {'verb' : 's11'},
    			's11' : {'adjective' : 's12'}
    		}
        oTrans3 = {
    			's0' : {'pronoun' : 'She'},
    			's1' : {'verb' : 'believes'},
    			's2' : {'pronoun' : 'that'},
    			's3' : {'pronoun' : 'he'},
    			's4' : {'verb' : 'thinks'},
    			's5' : {'pronoun' : 'that'},
    			's6' : {'pronoun' : 'I'},
    			's7' : {'verb' : 'know'},
    			's8' : {'pronoun' : 'that'},
    			's9' : {'pronoun' : 'he'},
    			's10' : {'verb' : 'is'},
    			's11' : {'adjective' : 'smart'}
    		}

        parseFlag3 = fst(transition3 , oTrans3 , 's0' , 's12')
        return parseFlag3.parse(input_array)

def fstForSpecialParse2(input_string , flag):

    input_array = input_string.split(" ")

    #a student in blue jeans
    if flag == 0 :
        transition1 = {
			's0' : {'article' : 's1'},
			's1' : {'noun' : 's2'},
			's2' : {'preposition' : 's3'},
			's3' : {'adjective' : 's4'},
			's4' : {'noun' : 's5'}
		}

        oTrans1 = {
            's0' : {'article' : 'a'},
			's1' : {'noun' : 'student'},
			's2' : {'preposition' : 'in'},
			's3' : {'adjective' : 'blue'},
			's4' : {'noun' : 'jeans'}
		}

        parseFlag1 = fst(transition1 , oTrans1 , 's0' , 's5')
        return parseFlag1.parse(input_array)


    #a student in blue jeans with long hair
    elif flag == 1 :
        transition2 = {
            's0' : {'article' : 's1'},
			's1' : {'noun' : 's2'},
			's2' : {'preposition' : 's3'},
			's3' : {'adjective' : 's4'},
			's4' : {'noun' : 's5'},
            's5' : {'preposition' : 's6'},
            's6' : {'adjective' : 's7'},
            's7' : {'noun' : 's8'}
		}

        oTrans2 = {
            's0' : {'article' : 'a'},
			's1' : {'noun' : 'student'},
			's2' : {'preposition' : 'in'},
			's3' : {'adjective' : 'blue'},
			's4' : {'noun' : 'jeans'},
            's5' : {'preposition' : 'with'},
            's6' : {'adjective' : 'long'},
            's7' : {'noun' : 'hair'}
		}


        parseFlag2 = fst(transition2 , oTrans2 , 's0' , 's8')
        return parseFlag2.parse(input_array)

    #a student in blue jeans with long hair on campus
    else:
        transition3 = {
            's0' : {'article' : 's1'},
			's1' : {'noun' : 's2'},
			's2' : {'preposition' : 's3'},
			's3' : {'adjective' : 's4'},
			's4' : {'noun' : 's5'},
            's5' : {'preposition' : 's6'},
            's6' : {'adjective' : 's7'},
            's7' : {'noun' : 's8'},
            's8' : {'preposition' : 's9'},
            's9' : {'noun' : 's10'}
		}

        oTrans3 = {
            's0' : {'article' : 'a'},
			's1' : {'noun' : 'student'},
			's2' : {'preposition' : 'in'},
			's3' : {'adjective' : 'blue'},
			's4' : {'noun' : 'jeans'},
            's5' : {'preposition' : 'with'},
            's6' : {'adjective' : 'long'},
            's7' : {'noun' : 'hair'},
            's8' : {'preposition' : 'on'},
            's9' : {'noun' : 'campus'}
		}

        parseFlag3 = fst(transition3 , oTrans3 , 's0' , 's10');
        return parseFlag3.parse(input_array)

def q3_1(input_str):
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

def main():
    sentence3_1 = 'The girl @ called you is my friend'
    sentence3_2 = 'The girl @ you called is my friend'

    print('question 3-a')
    print('sentense 3-a-1 : The girl who called you is my friend' , q3_1(sentence3_1) , sep = ' ; ')
    print()
    print('sentense 3-a-2 : The girl whom you called is my friend' , q3_1(sentence3_2) , sep = ' ; ')

    print()
    print('question 3-b')
    sentence3_1a = 'pronoun verb pronoun pronoun verb adjective'
    sentence3_1b = 'pronoun verb pronoun pronoun verb pronoun pronoun verb adjective'
    sentence3_1c = 'pronoun verb pronoun pronoun verb pronoun pronoun verb pronoun pronoun verb adjective'

    print('sentence 3-b-1 : I know that he is smart' , fstForSpecialParse(sentence3_1a , 0) , sep = ' ; ')
    print()
    print('sentence 3-b-2 : He thinks that I know that he is smart' , fstForSpecialParse(sentence3_1b , 1) , sep = ' ; ')
    print()
    print('sentence 3-b-3 : She believes that he thinks that I know that he is smart' , fstForSpecialParse(sentence3_1c , 2) , sep = ' ; ')

    print()
    print('question 3-c')
    sentence3_2a = 'article noun preposition adjective noun'
    sentence3_2b = 'article noun preposition adjective noun preposition adjective noun'
    sentence3_2c = 'article noun preposition adjective noun preposition adjective noun preposition noun'

    print('sentence 3-c-1 : a student in blue jeans' , fstForSpecialParse2(sentence3_2a , 0) , sep = ' ; ')
    print()
    print('sentence 3-c-2 : a student in blue jeans with long hair' , fstForSpecialParse2(sentence3_2b , 1) , sep = ' ; ')
    print()
    print('sentence 3-c-3 : a student in blue jeans with long hair on campus' , fstForSpecialParse2(sentence3_2c , 2) , sep = ' ; ')
    
if __name__ == '__main__':
    main()
