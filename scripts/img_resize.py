from __future__ import division
from PIL import Image

import os.path

new_height = 500
for root, _, files in os.walk('../img/'):
    for f in files:
        fullpath = os.path.join(root, f)
	img = Image.open(fullpath)
        width, height = img.size
        if height > new_height:
            height = int(height)
            width = int(width)
            factor = (int(new_height)/height)
            new_width = int(width*factor)
	    img_tmp = img.resize((new_width, int(new_height)), Image.ANTIALIAS)
            img_tmp.save("../img/" + f)
            print(f + " saved and resized.");
