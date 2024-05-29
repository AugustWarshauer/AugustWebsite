from terminaltexteffects.effects.effect_beams import Beams
from terminaltexteffects.effects.effect_errorcorrect import ErrorCorrect
from terminaltexteffects.utils.graphics import Color, Gradient



text1 = (">> --------------------------------------------------------------------"
         +"\n"+
         ">> *** August Warshauer ***                        *** May 28, 2024 ***"
         +"\n"+
         ">>"
         +"\n"+
         ">> How about this as a redirect page, eh? "
         +"\n"+">>\n"+
         ">> ⠑⠁⠎⠞⠑⠗⠤⠑⠛⠛⠖⠀⠺⠓⠕⠀⠅⠝⠑⠺⠀⠥⠝⠊⠉⠕⠙⠑⠀⠓⠁⠙⠀⠃⠗⠁⠊⠇⠇⠑⠀⠉⠓⠁⠗⠁⠉⠞⠑⠗⠎⠖⠢⠖⠀⠁⠝⠽⠺⠁⠽⠂⠀⠎⠑⠝⠙⠀"+"\n"+
         ">> ⠍⠑⠀⠁⠝⠀⠑⠍⠁⠊⠇⠀⠁⠞⠀⠁⠁⠺⠁⠗⠎⠓⠁⠥⠑⠗⠀⠁⠞⠀⠛⠍⠁⠊⠇⠲⠉⠕⠍⠀⠎⠁⠽⠊⠝⠛⠀⠽⠕⠥⠀⠋⠕⠥⠝⠙⠀⠞⠓⠊⠎⠲⠀⠋⠥⠝⠀⠋"+"\n"+
         ">> ⠁⠉⠞⠒⠀⠍⠽⠀⠓⠊⠛⠓⠀⠎⠉⠓⠕⠕⠇⠀⠎⠑⠝⠊⠕⠗⠀⠏⠗⠁⠝⠅⠀⠺⠁⠎⠀⠁⠝⠀⠑⠇⠁⠃⠕⠗⠁⠞⠑⠀⠑⠝⠙⠇⠑⠎⠎⠀⠁⠝⠙⠀⠗⠑⠺⠁⠗⠙"+"\n"+
         ">> ⠤⠏⠗⠕⠍⠊⠎⠊⠝⠛⠀⠎⠉⠁⠧⠑⠝"+" https://augustwarshauer.com/main "+"⠛⠑⠗⠀⠓⠥⠝⠞⠀⠊⠝⠀⠉⠕⠇⠇⠁"+"\n"+
         ">> ⠃⠕⠗⠁⠞⠊⠕⠝⠀⠺⠊⠞⠓⠀⠍⠽⠀⠛⠗⠑⠁⠞⠀⠋⠗⠊⠑⠝⠙⠀⠕⠵⠊⠕⠍⠁⠉⠓⠥⠅⠺⠥⠀⠕⠃⠊⠲⠀⠕⠅⠀⠇⠁⠎⠞⠀⠞⠓⠊⠝⠛⠀⠊⠎⠀⠍⠽⠀"+"\n"+
         ">> ⠃⠕⠕⠅⠀⠗⠑⠉⠕⠍⠍⠑⠝⠙⠁⠞⠊⠕⠝⠒⠀⠞⠓⠑⠀⠣⠍⠊⠎⠜⠃⠑⠓⠁⠧⠊⠕⠗⠀⠕⠋⠀⠍⠁⠗⠅⠑⠞⠎⠀⠃⠽⠀⠃⠑⠝⠕⠊⠞⠀⠍⠁⠝⠙⠑⠇⠃⠗"+"\n"+
         ">> ⠕⠞⠲⠀⠍⠁⠝⠙⠑⠇⠃⠗⠕⠞⠀⠊⠎⠀⠃⠑⠎⠞⠀⠅⠝⠕⠺⠝⠀⠋⠕⠗⠀⠓⠊⠎⠀⠍⠁⠞⠓⠑⠍⠁⠞⠊⠉⠁⠇⠀⠏⠗⠕⠺⠑⠎⠎⠀⠁⠝⠙⠀⠉⠗⠑⠁⠞⠊"+"\n"+
         ">> ⠕⠝⠀⠕⠋⠀⠋⠗⠁⠉⠞⠁⠇⠀⠞⠓⠑⠕⠗⠽⠂⠀⠃⠥⠞⠀⠓⠑⠀⠓⠁⠎⠀⠁⠀⠝⠥⠁⠝⠉⠑⠙⠀⠧⠊⠑⠺⠀⠕⠝⠀⠍⠁⠗⠅⠑⠞⠎⠲⠀⠁⠇⠞⠓⠕⠥⠛⠓"+"\n"+
         ">> ⠀⠁⠀⠃⠊⠞⠀⠕⠥⠞⠙⠁⠞⠑⠙⠂⠀⠊⠞⠄⠎⠀⠎⠞⠊⠇⠇⠀⠁⠀⠛⠗⠑⠁⠞⠀⠗⠑⠁⠙⠲⠀"+"\n"
         +">>\n"+
         ""
         +">>\n"+
         ">> cd https://www.linkedin.com/in/augustwarshauer/"
         +"\n"+
         ">> cd https://github.com/AugustWarshauer"
         +"\n"+
         ">> kill"
         +"\n"+
         ">>\n"+
         ">> --------------------------------------------------------------------")

effect = ErrorCorrect(text1)
effect.effect_config.final_gradient_stops = (Color("ccc8c8"))
effect.effect_config.swap_delay = 5
effect.effect_config.error_pairs = 0.1
with effect.terminal_output() as terminal:
    for frame in effect:
        terminal.print(frame)

# effect = Beams(text2)
# effect.effect_config.final_gradient_frames = 1
# effect.terminal_config.canvas_width = 80
# effect.terminal_config.canvas_height = 24
# effect.effect_config.beam_gradient_stops = (Color("0ff000"),Color("0ff000"),Color("0ff000")) # 
# effect.effect_config.final_gradient_stops = (Color("0ff000"),Color("0ff000"),Color("0ff000")) # 
# with effect.terminal_output(end_symbol=" ") as terminal:
#     for frame in effect:
        # terminal.print(frame)


from time import sleep
import sys
import math

for i in range(101):
    sys.stdout.write('\r')
    filled_length = math.floor(i / 5)
    bar = '🟩' * filled_length + '⬜' * (20 - filled_length)
    sys.stdout.write("[%s] %d%%" % (bar, i))
    sys.stdout.flush()
    sleep(0.001*i)