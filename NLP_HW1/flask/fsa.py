class fsa:
    def __init__(self , translate , start_state , fin_state , speech_list):
        self.translate = translate
        self.start_state = start_state
        self.fin_state  = fin_state
        self.speech_list = speech_list

    def parse(self , input_str):
        state_info = []
        state = self.start_state
        for i in input_str:
            info = 'Current state : %s ' % (state)
            part_of_speech = self.speech_list[i]
            state = self.translate[state][part_of_speech]
            info += 'and next state : %s' % (state)
            state_info.append(info)

        if isinstance(self.fin_state , tuple):
            for i in self.fin_state:
                if state == i:
                    state_info.append('Done!')
                    return state_info
        else:
            if state == self.fin_state:
                state_info.append('Done!')
                return state_info
        state_info.append('Failed!')
        return state_info
