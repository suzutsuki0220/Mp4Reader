function outputHex(payload) {
    var str = "";
    var i = 0;
    while (i < payload.length) {
        str += str ? " " : "";
        str += payload.toString('hex', i, i+1);
        i++;
    }
    return str;
}

module.exports.atom = {
    ftyp: {
        description: "file type and compatibility",
        hasChild: false,
        display: outputHex
    },
    pdin: {
        description: "progressive download information",
        hasChild: false,
        display: outputHex
    },
    moov: {
        description: "container for all the metadata",
        hasChild: true,
        display: outputHex
    },
    mvhd: {
        description: "movie header, overall declarations",
        hasChild: false,
        display: outputHex
    },
    trak: {
        description: "container for an individual track or stream",
        hasChild: true,
        display: outputHex
    },
    tkhd: {
        description: "track header, overall information about the track",
        hasChild: false,
        display: outputHex
    },
    tref: {
        description: "track reference container",
        hasChild: false,
        display: outputHex
    },
    edts: {
        description: "edit list container",
        hasChild: true,
        display: outputHex
    },
    elst: {
        description: "an edit list",
        hasChild: false,
        display: outputHex
    },
    mdia: {
        description: "container for the media information in a track",
        hasChild: true,
        display: outputHex
    },
    mdhd: {
        description: "media header, overall information about the media",
        hasChild: false,
        display: outputHex
    },
    hdlr: {
        description: "handler, declares the media (handler) type",
        hasChild: false,
        display: outputHex
    },
    minf: {
        description: "media information container",
        hasChild: true,
        display: outputHex
    },
    vmhd: {
        description: "video media header, overall information (video track only)",
        hasChild: false,
        display: outputHex
    },
    smhd: {
        description: "sound media header, overall information (sound track only)",
        hasChild: false,
        display: outputHex
    },
    hmhd: {
        description: "hint media header, overall information (hint track only)",
        hasChild: false,
        display: outputHex
    },
    nmhd: {
        description: "Null media header, overall information (some tracks only)",
        hasChild: false,
        display: outputHex
    },
    dinf: {
        description: "data information box, container",
        hasChild: true,
        display: outputHex
    },
    dref: {
        description: "data reference box, declares source(s) of media data in track",
        hasChild: false,
        display: outputHex
    },
    stbl: {
        description: "sample table box, container for the time/space map",
        hasChild: true,
        display: outputHex
    },
    stsd: {
        description: "sample descriptions (codec types, initialization etc.)",
        hasChild: false,
        display: outputHex
    },
    stts: {
        description: "(decoding) time-to-sample",
        hasChild: false,
        display: outputHex
    },
    ctts: {
        description: "(composition) time to sample",
        hasChild: false,
        display: outputHex
    },
    stsc: {
        description: "sample-to-chunk, partial data-offset information",
        hasChild: false,
        display: outputHex
    },
    stsz: {
        description: "sample sizes (framing)",
        hasChild: false,
        display: outputHex
    },
    stz2: {
        description: "compact sample sizes (framing)",
        hasChild: false,
        display: outputHex
    },
    stco: {
        description: "chunk offset, partial data-offset information",
        hasChild: false,
        display: outputHex
    },
    co64: {
        description: "64-bit chunk offset",
        hasChild: false,
        display: outputHex
    },
    stss: {
        description: "sync sample table (random access points)",
        hasChild: false,
        display: outputHex
    },
    stsh: {
        description: "shadow sync sample table",
        hasChild: false,
        display: outputHex
    },
    padb: {
        description: "sample padding bits",
        hasChild: false,
        display: outputHex
    },
    stdp: {
        description: "sample degradation priority",
        hasChild: false,
        display: outputHex
    },
    sdtp: {
        description: "independent and disposable samples",
        hasChild: false,
        display: outputHex
    },
    sbgp: {
        description: "sample-to-group",
        hasChild: false,
        display: outputHex
    },
    sgpd: {
        description: "sample group description",
        hasChild: false,
        display: outputHex
    },
    subs: {
        description: "sub-sample information",
        hasChild: false,
        display: outputHex
    },
    mvex: {
        description: "movie extends box",
        hasChild: true,
        display: outputHex
    },
    mehd: {
        description: "movie extends header box",
        hasChild: false,
        display: outputHex
    },
    trex: {
        description: "track extends defaults",
        hasChild: false,
        display: outputHex
    },
    ipmc: {
        description: "IPMP Control Box",
        hasChild: false,
        display: outputHex
    },
    moof: {
        description: "movie fragment",
        hasChild: true,
        display: outputHex
    },
    mfhd: {
        description: "movie fragment header",
        hasChild: false,
        display: outputHex
    },
    traf: {
        description: "track fragment",
        hasChild: true,
        display: outputHex
    },
    tfhd: {
        description: "track fragment header",
        hasChild: false,
        display: outputHex
    },
    trun: {
        description: "track fragment run",
        hasChild: false,
        display: outputHex
    },
    sdtp: {
        description: "independent and disposable samples",
        hasChild: false,
        display: outputHex
    },
    sbgp: {
        description: "sample-to-group",
        hasChild: false,
        display: outputHex
    },
    subs: {
        description: "sub-sample information",
        hasChild: false,
        display: outputHex
    },
    mfra: {
        description: "movie fragment random access",
        hasChild: true,
        display: outputHex
    },
    tfra: {
        description: "track fragment random access",
        hasChild: false,
        display: outputHex
    },
    mfro: {
        description: "movie fragment random access offset",
        hasChild: false,
        display: outputHex
    },
    mdat: {
        description: "media data container",
        hasChild: false,
        display: outputHex
    },
    free: {
        description: "free space",
        hasChild: false,
        display: outputHex
    },
    skip: {
        description: "free space",
        hasChild: true,
        display: outputHex
    },
    udta: {
        description: "User data",
        hasChild: true,
        display: outputHex
    },
    cprt: {
        description: "copyright etc.",
        hasChild: false,
        display: outputHex
    },
    meta: {
        description: "metadata",
        hasChild: true,
        display: outputHex
    },
    hdlr: {
        description: "handler, declares the metadata (handler) type",
        hasChild: false,
        display: outputHex
    },
    dinf: {
        description: "data information box, container",
        hasChild: true,
        display: outputHex
    },
    dref: {
        description: "data reference box, declares source(s) of metadata items",
        hasChild: false,
        display: outputHex
    },
    ipmc: {
        description: "IPMP Control Box",
        hasChild: false,
        display: outputHex
    },
    iloc: {
        description: "item location",
        hasChild: false,
        display: outputHex
    },
    ipro: {
        description: "item protection",
        hasChild: true,
        display: outputHex
    },
    sinf: {
        description: "protection scheme information box",
        hasChild: true,
        display: outputHex
    },
    frma: {
        description: "original format box",
        hasChild: false,
        display: outputHex
    },
    imif: {
        description: "IPMP Information box",
        hasChild: false,
        display: outputHex
    },
    schm: {
        description: "scheme type box",
        hasChild: false,
        display: outputHex
    },
    schi: {
        description: "scheme information box",
        hasChild: false,
        display: outputHex
    },
    iinf: {
        description: "item information",
        hasChild: false,
        display: outputHex
    },
    xml: {
        description: "XML container",
        hasChild: false,
        display: outputHex
    },
    bxml: {
        description: "binary XML container",
        hasChild: false,
        display: outputHex
    },
    pitm: {
        description: "primary item reference",
        hasChild: false,
        display: outputHex
    }
};
