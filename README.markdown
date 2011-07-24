Opera Link Time Machine
=======================

This is a very rough prototype for an idea for a "time machine" for
the [Opera Link](http://www.opera.com/link/) data (retrieved with the
[Opera Link API](http://dev.opera.com/articles/view/introducing-the-opera-link-api/)). The
idea is showing a list of available backups, along with some basic
information, and when clicking on one of them, showing a "diff"
between the current state and the given backup.

Features that change data don't work right now, and I'm not sure I'll
ever implement them (they should be easy to implement, but will
probably take some time, and I was only interested in a proof of
concept). Feel free to fork this repo and implement yourself. If you
send me pull requests, I'll integrate them.


Dependencies
------------

All the code is Javascript. The server is written with
[Node.js](http://nodejs.org/) and the client is written using
[Angular](http://angularjs.org/). For the server, you'll need to
install [valentine](https://github.com/ded/valentine) (using
[npm](http://npmjs.org/)).


License
-------

The source code included in this distribution is released under the
BSD license:

Copyright © 2011, Esteban Manchado Velázquez
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

* Redistributions of source code must retain the above copyright
  notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright
  notice, this list of conditions and the following disclaimer in the
  documentation and/or other materials provided with the distribution.
* Neither the name of Opera Software nor the names of its contributors
  may be used to endorse or promote products derived from this
  software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
