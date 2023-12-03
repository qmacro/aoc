(ns adventofcode.day02
  (:require [clojure.string :as str]))
  
;; Start with the input
(def in (-> "resources/day02input" slurp str/split-lines))

(defn lwh
  "Create a seq of length, width & height dimension integer vals
  from a dimension string of this form: lxwxh. Return in ascending
  order.
  Example: 2x3x4 -> [2 3 4]"
  [dimstring]
  (sort (map #(Integer. %) (clojure.string/split dimstring #"x"))))

(defn areas
  "Calc the 3 different area amounts required length x width,
  width x height and height x length. Return them as a seq.
  Example: [2 3 4] -> [6 8 12]"
  [[l w h]]
  [(* l w) (* w h) (* h l)])

(defn paper
  "Calc total area of paper required for a given parcel, including
  an area of the smallest side, which will be the first amount in
  the sequence.
  Example: [6 8 12] -> 58"
  [areas]
  (let [smallest (first areas)]
    (+ smallest (* 2 (reduce + areas)))))

(defn wrappingrequired
  "Wrapper function around paper, to be able to call it with a
  dim string.
  Example: 2x3x4 -> 58"
  [dimstring]
  (paper (areas (lwh dimstring))))

(defn ribbonlength [dimstring]
  "Returns the length of ribbon needed - feet around the
  shortest perimeter plus cubic feet of volume.
  Example: 2x3x4 -> 34"
  [dimstring]
  (let [dims (lwh dimstring)]
    (+
     (->> dims (take 2) (reduce +) (* 2))
     (->> dims (reduce *)))))

(defn solve
  "..."
  [& args]
  (println

    ;; Part 1
    (reduce + (map wrappingrequired in))
        
    ;; Part 2
    (reduce + (map ribbonlength in))))
