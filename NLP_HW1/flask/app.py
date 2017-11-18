from flask import Flask,render_template,request,url_for,jsonify
from fsa import fsa


app = Flask(__name__)
 
@app.route('/')
def index():
    return render_template('idx.html')
	
@app.route('/question_1' , methods = ['POST'])
def question_1():
    if request.method == 'POST':
        
        speech_list = {'John' : 'n' , 'put' : 'v' , 'a' : 'article' , 'book' : 'n' ,
         'on' : 'adv' , 'table' : 'n' , 'in' : 'adv' , 'classroom' : 'n' ,
         'the' : 'article' , 'science' : 'adj' , 'building' : 'n' , 'campus' : 'n'}
        translation = {  's0' : {'n' : 's1'},
                         's1' : {'v' : 's2'},
                         's2' : {'article' : 's3'},
                         's3' : {'n' : 's4'},
                         's4' : {'adv' : 's5'},
                         's5' : {'article' : 's6' , 'n' : 's8'},
                         's6' : {'adj' : 's7' , 'n' : 's8'},
                         's7' : {'n' : 's8'},
                         's8' : {'adv' : 's5'}
                        }
        input_str = request.form['input_str'].split(' ')
        
        fsa_test = fsa(translation , 's0' , 's8' , speech_list)
        result = fsa_test.parse(input_str)
        
        
        
        return jsonify(result)

@app.route('/question_2' , methods = ['POST'])
def question_2():
    if request.method == 'POST':
        
        speech_list = {'John' : 'n' , 'read' : 'v' , 'a' : 'article' , 'book' : 'n' ,
                         'that' : 'pron' , 'the' : 'article' , 'famous' : 'adj' , 'writer' : 'n' ,
                         'many' : 'adj' , 'students' : 'n' , 'liked' : 'v' , 'wrote' : 'v' , 'respected' : 'v',
                         'my' : 'pron' , 'superviser' : 'n' , 'taught' : 'v' , 'colleagues' : 'n' ,
                    }
        
        translation = {
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
        input_str = request.form['input_str'].split(' ')
        
        fsa_test = fsa(translation , 's0' , ('s4' , 's9') , speech_list)
        result = fsa_test.parse(input_str)
        
        return jsonify(result)


@app.route('/question_3' , methods = ['POST'])
def question_3():
    if request.method == 'POST':
        
        speech_list = {
                        'John' : 'n', 'knows' : 'v' , 'that' : 'pron' , 'he' : 'pron',
                        'is' : 'v' , 'very' : 'adv' , 'smart' : 'adj' ,
                        'Mary' : 'n' , 'thinks' : 'v' , 
                        'Sue' : 'n' , 'believes' : 'v' ,
                        'Sam' : 'n' , 'realizes' : 'v'
                        }
        
        translation = {
                        's0' : {'n' : 's1'},
                        's1' : {'v' : 's2'},
                        's2' : {'pron' : 's3'},
                        's3' : {'n' : 's1' , 'pron' : 's3' , 'v' : 's4'},
                        's4' : {'adj' : 's6' , 'adv' : 's5'},
                        's5' : {'adj' : 's6'},
                        's6' : ''
                        }
        input_str = request.form['input_str'].split(' ')
        
        fsa_test = fsa(translation , 's0' , 's6' , speech_list)
        result = fsa_test.parse(input_str)
           
        return jsonify(result)
 
if __name__ == "__main__":
    app.debug = True
    app.run()
