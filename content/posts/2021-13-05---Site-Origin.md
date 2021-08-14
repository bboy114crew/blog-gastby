---
title: Understanding "same-site" and "same-origin"
date: "2021-05-13"
template: "post"
draft: true
slug: "/posts/same-site-same-origin/"
category: "Security 101"
tags:
  - "Note"
description: "Security 101."
---

### 1. Origin

"Origin" is a combination of a scheme (also known as the protocol, for example HTTP or HTTPS), hostname, and port (if specified). For example, given a URL of https://www.example.com:443/foo , the "origin" is https://www.example.com:443.

### 2. Site
Top-level domains (TLDs) such as .com and .org are listed in the Root Zone Database. In the example above, "site" is the combination of the TLD and the part of the domain just before it. For example, given a URL of https://www.example.com:443/foo , the "site" is example.com.

However, for domains such as .co.jp or .github.io, just using the TLD of .jp or .io is not granular enough to identify the "site". And there is no way to algorithmically determine the level of registrable domains for a particular TLD. That's why a list of "effective TLDs"(eTLDs) was created. These are defined in the Public Suffix List. The list of eTLDs is maintained at publicsuffix.org/list.

The whole site name is known as the eTLD+1. For example, given a URL of https://my-project.github.io , the eTLD is .github.io and the eTLD+1 is my-project.github.io, which is considered a "site". In other words, the eTLD+1 is the effective TLD and the part of the domain just before it.

### 3. Mixed content
Mixed content occurs when initial HTML is loaded over a secure HTTPS connection, but other resources (such as images, videos, stylesheets, scripts) are loaded over an insecure HTTP connection. This is called mixed content because both HTTP and HTTPS content are being loaded to display the same page, and the initial request was secure over HTTPS.