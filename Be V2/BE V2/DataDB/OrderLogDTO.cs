﻿using System;

namespace BE_V2.DTOs
{
    public class OrderLogDTO
    {
        public int OrderID { get; set; }
        public bool Phase1 { get; set; } = false;
        public bool Phase2 { get; set; } = false;
        public bool Phase3 { get; set; } = false;
        public bool Phase4 { get; set; } = false;
        public DateTime PhaseTime { get; set; } = DateTime.Now;
    }
}
