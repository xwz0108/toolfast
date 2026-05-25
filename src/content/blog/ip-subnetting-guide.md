## IP Subnetting Made Simple

Subnetting divides a network into smaller subnetworks. The subnet mask determines which part of an IP address is the network and which is the host.

### CIDR Notation

Instead of writing `255.255.255.0`, we write `/24` — it means "the first 24 bits are the network."

| CIDR | Subnet Mask | Hosts | Class |
|------|------------|:-----:|------|
| /24 | 255.255.255.0 | 254 | C |
| /16 | 255.255.0.0 | 65,534 | B |
| /8 | 255.0.0.0 | 16M | A |
| /28 | 255.255.255.240 | 14 | Small |

### How to Calculate

1. Take a CIDR like `192.168.1.0/24`
2. `/24` = first 24 bits are network
3. Remaining 8 bits are host = 2^8 - 2 = 254 usable

### Real Example

```
IP:    192.168.1.100
Mask:  255.255.255.0  (/24)

Network:   192.168.1.0
Broadcast: 192.168.1.255
Range:     192.168.1.1 - 192.168.1.254
```

### Common Subnet Sizes

| CIDR | Usable IPs | Typical Use |
|------|:---:|------|
| /30 | 2 | Point-to-point |
| /29 | 6 | Small office |
| /28 | 14 | Department |
| /24 | 254 | Standard LAN |

[Use IP Calculator →](/tools/ip-calculator)
