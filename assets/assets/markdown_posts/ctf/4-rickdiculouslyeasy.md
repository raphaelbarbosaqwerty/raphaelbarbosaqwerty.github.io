# Rickdiculously Easy - CTF
#### June 22, 2020
#### HACKING,CTF,EN
#### assets/images/posts/rickme.jpg

Easy box, starting with the easy box to hard. But all boxes confirmed in OSCP preparation.  

![RickSanchez](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/ricksanchez.jpg)

### Preparing to OSCP ###

I'm starting today a new series on the blog, showing some boxes for preparation for the OSCP. This box has received the tier Easy, this box has flags with 130 points in total.

### Scanning ###

I start by searching the box in the network.  

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/1_foundnetwork.png)

After I found the machine in the network, started to enumerate all services and ports with the command:  
```
nmap -A -v -p- 192.18.183.140
-A = All  
-v = Verbose  
-p- = All Ports
```  
![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/nmap_information.png)  

### WebApp ###

Let's check ports **80** and **9090**...  

In ports **9090** we have found the first flag  
**1) FLAG {THERE IS NO ZEUS, IN YOUR FACE!} - 10 POINTS.**  

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/1.1flag_fedora.png)  

The fast we can note this site made by **Morty**.  

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/2_mortyweb.png)  

Let's find more information, for this, I used gobuster with the command:  
```
gobuster dir -u http://192.168.183.140 -w /usr/share/wordlist/dirb/big.txt -t 200
```

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/2.1_gobuster_morty.png)  

Something looks interesting here **/passwords** let's check.  

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/2.2passwords.png)

We can see the **FLAG.txt**.  

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/2flag.4_passwords.png)  

The second flag  
**2) FLAG {Yeah d- just don't do it.} - 10 Points.**

We can check now the passwords.html

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/2.4passwordshtml.png)  

Let's check the source from the page. **(Remember always check the source page, sometimes you can find good information).**

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/2.5password_winter.png)

How I said we have sensitive information here:  
**Password: winter** for me this is very suspicious.

Now we can check the **robots.txt** fast.

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/2.3robots.png)  

We have good information here, **Tracer**. Let's check both.

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/2.6root_shell_cgi.png) 

I enter directly on source page of the **root_shell.cgi** but nothing found. Just a joke from **summer**?  

We found something good in the **tracertool.cgi** very good. Not to take your time here we can execute commands on the machine, but are very limited I tried to get some web-shell but unsuccessfully. I decide to get all **users**, because we have a **password**, we can try a **bruteforce**.

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/2.7osinjectionusers.png)  

### Other's services and ports ###

Before we start the bruteforce I decided to jump and check all other ports.
```
21
13337
60000
```

Let's check the **FTP** running in the port **21** accept an anonymous connection. And we can see have a flag inside the **FTP.**

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/3anonftp.png)

Using the command **get** I downloaded the flag.

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/3.3flagftp.png)  

Now we have the third flag  
**3) FLAG {Whoa this is unexpected} - 10 Points** 

I'll try to check in the other port using the netcat. And we got two more flags.  

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/4flag_13337nc.png)  
  

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/5flag_60000ncport.png)  

**4) FLAG {TheyFoundMyBackDoorMorty} - 10Points**  
**5) FLAG {Flip the pickle Morty!} - 10 Points**  

### BruteForce ###

After we check all the ports I decided to work on the bruteforce to check if we can get something.

We have 3 users.
```
RickSanchez
Morty
Summer
```
A password.
```
winter
```  

As I imagined, **winter** is the inverse of **summer**, ironic. lmao.  
![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/6brutesshSummer.png)  

Inside the Summer's directory, we got another flag.  

**6) FLAG {Get off the high road Summer!} - 10 Points.**  

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/6.16flagSummer.png) 

Let's check for info on the machine. We have found something good in the Morty directory.   

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/6.1mortydir.png)  

We have two files here. I decided to download the image to check if we have some hidden data inside. Nothing found with exiftool.

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/6.2exiftoolmorty.png)  

I remember the Strings command and we got a password.
```
Meeseek
```

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/6.3stringspasswordmorty.png)  

I tried to unzip the journal and they asked me a password. I tried the password **Meeseek** and bingo.  

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/6.4unzipjournal.png)  

We got another flag here and a good tip for the next step.  

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/6.5journal6flag.png) 

Flag with good points  
**7) FLAG {131333} - 20 Points**  

After this I decided to check the RickSanchez directory looking for some good information we good a file, but without permission to execute. I decided to download it for the local machine.  
![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/6.6rickdirs.png) 

I was able to execute the file on my system and we got a message a good tip, **GOD DAMN COMMAND LINE..**, not it's obvious we need to use other arguments to decrypt the message.  

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/6.7safeargs.png) 

I lost some time here, but I remember RickSanchez is a 1337 player and I tried the last flag **131333** and bingo we decrypted the message and got another flag.  

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/6.8safeflag.png)  

**8) FLAG{And Awwwaaaaayyyy we Go!} - 20 Points.**  

Very basic OSINT challenge looking for the old band of RickSanchez and we found.  

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/6.9osint_rickband.png) 

Following the rules about the password, I decided to generate the wordlist using crunch and here are the commands.

```
crunch 5 5 -t ,%The > the_wordlist.txt
crunch 7 7 -t ,%Flesh > flesh_wordlist.txt
crunch 10 10 -t ,%Curtains > curtains_wordlist.txt
```

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/7generate_wordlist.png)  

I tried the bruteforce with success on the last **curtains_wordlist.txt.**  

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/7.1passwordfound.png)  

LogIn with **RickSanchez** user and password **P7Curtains** with success.  

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/8loginricksuccess.png)  

I was able to change to the user with **sudo su**. And finally I found the last flag.  

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/9lastflagrick.png) 

**9) FLAG: {Ionic Defibrillator} - 30 points.**

All flags and points.  

![FoundNetwork](https://raw.githubusercontent.com/raphaelbarbosaqwerty/raphaelbarbosaqwerty.github.io/master/data/assets/ctfs/rickdiculouslyeasy/10totalflags130points.png)  

