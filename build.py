import os
import sys

os.system("cls" if os.name == "nt" else "clear")
banner = r"""
██╗      █████╗ ███████╗ █████╗ ██████╗ ██╗   ██╗███████╗
██║     ██╔══██╗╚══███╔╝██╔══██╗██╔══██╗██║   ██║██╔════╝
██║     ███████║  ███╔╝ ███████║██████╔╝██║   ██║███████╗
██║     ██╔══██║ ███╔╝  ██╔══██║██╔══██╗██║   ██║╚════██║
███████╗██║  ██║███████╗██║  ██║██║  ██║╚██████╔╝███████║
╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
                                                         
            ██████╗ ██╗   ██╗██╗██╗     ██████╗          
            ██╔══██╗██║   ██║██║██║     ██╔══██╗         
            ██████╔╝██║   ██║██║██║     ██║  ██║         
            ██╔══██╗██║   ██║██║██║     ██║  ██║         
            ██████╔╝╚██████╔╝██║███████╗██████╔╝         
            ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝           """
print(banner+"\n")
bos = input("WHich OS to build for? [Windows, Linux]>> ")
if bos != None:
	if bos == "Windows":
		print("Starting Build...")
		try:
			os.system("npm run build-windows")
			print("Done!")
		except Exception as e:
			print(f"Error: {e}")
		input("PRESS ENTER TO EXIT...")
		sys.exit()
	elif bos == "Linux":
		print("Starting Build...")
		try:
			os.system("npm run build-linux")
			print("Done!")
		except Exception as e:
			print(f"Error: {e}")
			input("PRESS ENTER TO EXIT...")
		sys.exit()
	else:
		print("Enter a valid OS!")
		input("PRESS ENTER TO EXIT...")
		sys.exit()
else:
	print("Please input an OS!")
	input("PRESS ENTER TO EXIT...")
	sys.exit()
