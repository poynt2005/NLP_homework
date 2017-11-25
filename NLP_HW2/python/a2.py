import re

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

def main() :
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

if __name__ == '__main__':
    main()
