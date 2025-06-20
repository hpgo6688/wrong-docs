```sh
➜ ~$ xcrun simctl list runtimes -j | jq '.runtimes[] | select(.identifier | contains("iOS-18-5")) | {name, version, identifier, availability, path}'

{
  "name": "iOS 18.5",
  "version": "18.5",
  "identifier": "com.apple.CoreSimulator.SimRuntime.iOS-18-5",
  "availability": null,
  "path": null
}
➜ ~$ xcrun simctl list runtimes

== Runtimes ==
iOS 18.5 (18.5 - 22F77) - com.apple.CoreSimulator.SimRuntime.iOS-18-5
➜ ~$ cd Developer
cd: no such file or directory: Developer
➜ ~$ cd Developer
cd: no such file or directory: Developer
➜ ~$ cd Develop
➜ ~/Develop$ cd shell
➜ ~/Develop/shell$ ls
mount_sim.sh
➜ ~/Develop/shell$ ./mount_sim.sh
正在检查“MBR”的校验和…
                                 MBR：已验证CRC32 $A12B1D3B
正在检查“Primary GPT Header”的校验和…
                  Primary GPT Header：已验证CRC32 $76FE9CAB
正在检查“Primary GPT Table”的校验和…
                   Primary GPT Table：已验证CRC32 $DD8DF107
正在检查“Apple_APFS”的校验和…
......................................................................................................................................................................
                          Apple_APFS：已验证CRC32 $4CE943D5
正在检查“Backup GPT Table”的校验和…
                    Backup GPT Table：已验证CRC32 $DD8DF107
正在检查“Backup GPT Header”的校验和…
                   Backup GPT Header：已验证CRC32 $4BB07CFF
已验证CRC32 $67E7F54B
/dev/disk8          	GUID_partition_scheme
/dev/disk8s1        	Apple_APFS
/dev/disk9          	EF57347C-0000-11AA-AA11-0030654
/dev/disk9s1        	41504653-0000-11AA-AA11-0030654	/Volumes/iOS 18.5 Simulator
➜ ~/Develop/shell$ xcrun simctl list runtimes

== Runtimes ==
iOS 18.5 (18.5 - 22F77) - com.apple.CoreSimulator.SimRuntime.iOS-18-5
➜ ~/Develop/shell$
```