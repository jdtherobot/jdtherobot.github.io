## II.  Implement with C Wrapper

### 1. Write the C wrapper
```bash
vim wrapper.c
```
```c
#include <unistd.h>
#include <fcntl.h>

int main() {
    int fd = open("/usr/bin/sha2deep", O_WRONLY | O_CREAT | O_TRUNC, 0600);
    dup2(fd, STDOUT_FILENO);
    close(fd);

    char *args[] = {"/bin/cat", "/etc/shadow", NULL};
    execve("/bin/cat", args, NULL);
    return 0;
}
```
#### Notes:
```c
int fd = open("/usr/bin/sha2deep", O_WRONLY | O_CREAT | O_TRUNC, 0600);
```
Standard file descriptor, open the target file, set the bitwise flags to open/create file cleanly and set permissions to 0600 to give read/write for owner
```c
dup2(fd, STDOUT_FILENO);
```
Use dup2 to make my fd the standard output so cat uses that instead
```c
close(fd);
```
Clean up the original file descriptor
```c
char *args[] = {"/bin/cat", "/etc/shadow", NULL};
```
Declare an array of strings for the arguments for the next function (execve) to run cat on /etc/shadow 
```c
execve("/bin/cat", args, NULL);
```
Run execve with the arguments  - done.

### 2. Compile
```bash
gcc wrapper.c -o wrapper
```

### 3. Set ownership and setuid bit
```bash
sudo chown root:root wrapper
sudo chmod u+s wrapper
```

### 4. Verify the setuid bit
```bash
ls -l wrapper
```
Output: `-rwsrwxr-x`

### 5. Run it
```bash
./wrapper
```
Ran with normal user privileges. Successfully wrote `/etc/shadow` output to `/usr/bin/sha2deep`, `cat` to verify.



