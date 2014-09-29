import sys
yourappname = "/home/jamesharding/webapps/personal_python/htdocs"
if not yourappname in sys.path:
    sys.path.insert(0, yourappname)

print "Appended to path"


activate_this='/home/jamesharding/venvs/PersonalSiteVenv/bin/activate_this.py'
execfile(activate_this, dict(__file__=activate_this))

from startup import app as application
