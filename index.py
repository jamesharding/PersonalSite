import sys
yourappname = "/home/jamesharding/webapps/jameshardingca/htdocs"
if not yourappname in sys.path:
    sys.path.insert(0, yourappname)

print "Appended to path"

from startup import app as application
